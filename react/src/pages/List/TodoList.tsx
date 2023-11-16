import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTodoData } from '@pages/List/TodoList.hooks';
import TodoItemComponent from './TodoItem';
import { getTodoList } from '@/api/TodoAPI';
import { TodoItem } from '@/types/TodoTypes';

export default function TodoList() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(4);
  const [filter, setFilter] = useState<'all' | 'done' | 'notDone'>('all');
  const { totalNum } = useTodoData();
  const [todoListData, setTodoListData] = useState<TodoItem[]>([]);

  useEffect(() => {
    getTodoList().then(data => setTodoListData(data));
  }, []);

  const handleCheckboxUpdate = updatedItem => {
    setTodoListData(prevData => prevData.map(item => (item._id === updatedItem._id ? updatedItem : item)));
  };

  const getListData = () => {
    const filteredData = todoListData.filter(item => {
      if (filter === 'done') return item.done;
      if (filter === 'notDone') return !item.done;
      return true;
    });
    return filteredData.slice(0, limit);
  };

  const handleViewMore = () => {
    setLimit(prev => prev + 4);
  };

  return (
    <Page>
      <Title>TODO LIST</Title>
      <FilterButtons>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('done')}>Done</button>
        <button onClick={() => setFilter('notDone')}>Not Done</button>
      </FilterButtons>
      <div id="content">
        {getListData().map(item => (
          <TodoItemComponent key={item._id} item={item} onUpdate={handleCheckboxUpdate} />
        ))}
        {/* <List className="todolist">{getListData()}</List> */}
        {totalNum > 0 && (
          <Button className="viewMore-btn" disabled={limit >= totalNum} onClick={handleViewMore}>
            View More...
          </Button>
        )}
        <Button className="regist-btn" onClick={() => navigate('regist')}>
          Add Todo
        </Button>
      </div>
    </Page>
  );
}

const Page = styled.div`
  background-color: #2d2d2d;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  margin: 40px auto 50px;
  color: #0f64a3;
`;

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;

const Button = styled.button`
  border: none;
  background-color: #2d77af;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &.view-btn {
    padding: 10px 20px;
    width: 70px;
    font-size: 12px;

    &:hover {
      border: 1px solid #2d77af;
      background-color: white;
      color: #2d77af;
    }
  }

  &.viewMore-btn {
    font-size: 20px;
    background-color: transparent;
    text-decoration: underline;
    margin-bottom: 20px;

    &:disabled {
      color: gray;
      cursor: default;
    }
  }

  &.regist-btn {
    padding: 20px 80px;
    font-size: 20px;
    margin: 0 auto 80px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #3a8fd2;
      color: white;
    }
  }
`;
