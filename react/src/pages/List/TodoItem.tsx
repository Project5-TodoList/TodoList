import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCheckboxState } from '@/hooks/useCheckboxState';
import { useEffect } from 'react';

const TodoItemComponent = ({ item, onUpdate }) => {
  const navigate = useNavigate();
  const { isChecked, handleCheckboxChange } = useCheckboxState(item);

  useEffect(() => {
    if (isChecked !== item.done) {
      onUpdate({ ...item, done: isChecked });
    }
  }, [isChecked]);

  return (
    <ListItem key={item._id}>
      <CheckboxContainer>
        <input type="checkbox" id={`checkbox-${item._id}`} checked={isChecked} onChange={handleCheckboxChange} />
        <label htmlFor={`checkbox-${item._id}`}></label>
      </CheckboxContainer>
      <TitleContentContainer>
        <StyledLink to={`todo/${item._id}`}>{item.title}</StyledLink>
        <ContentParagraph>{item.content}</ContentParagraph>
      </TitleContentContainer>
      <Button className="view-btn" onClick={() => navigate(`todo/${item._id}`)}>
        VIEW
      </Button>
    </ListItem>
  );
};

export default TodoItemComponent;

const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  margin: 0 auto 30px;
  width: 500px;
  max-width: calc(100% - 90px);
  border-radius: 20px;
  padding: 20px;
`;

const CheckboxContainer = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  flex-shrink: 0;

  input[type='checkbox'] {
    visibility: hidden;
  }

  label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    &:after {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      width: 12px;
      height: 6px;
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      opacity: 0;
      transform: rotate(-45deg);
    }
  }

  input[type='checkbox']:checked + label {
    background-color: #16c248;
    border-color: #16c248;

    &:after {
      opacity: 1;
    }
  }
`;

const TitleContentContainer = styled.div`
  width: calc(100% - 110px);
`;

const StyledLink = styled(Link)`
  display: block;
  color: #000;
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ContentParagraph = styled.p`
  padding: 0;
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

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
