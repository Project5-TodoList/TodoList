import { useTodoInfo } from '@pages/Info/TodoInfo.hooks';
import { useCheckboxState } from '@/hooks/useCheckboxState';
import { formatDate } from '@/util/dateUtils';
import { useNavigateHome } from '@/hooks/useNavigateHome';
import styled from 'styled-components';

export default function TodoInfo() {
  const {
    todo,
    isEditing,
    updatedTitle,
    updatedContent,
    handleEditClick,
    handleDeleteClick,
    setUpdatedTitle,
    setUpdatedContent,
    setIsEditing,
  } = useTodoInfo();
  const { isChecked, handleCheckboxChange } = useCheckboxState(todo);

  return (
    <div>
      <div id="app">
        <div id="page">
          <h1>TODO DETAIL</h1>
          <button onClick={useNavigateHome()} style={{ marginBottom: '50px', padding: '20px' }}>
            HOME
          </button>

          <TodoDetailWrap>
            <PatchBox>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  id={`checkbox-${todo._id}`}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`checkbox-${todo._id}`}></label>
              </CheckboxContainer>
              <div>
                <span>
                  작성:{todo.createdAt && formatDate(todo.createdAt)}
                  <br />
                  수정:{todo.updatedAt && formatDate(todo.updatedAt)}
                </span>
              </div>
            </PatchBox>
            <Title>
              {isEditing ? (
                <TitleInput
                  type="text"
                  id="titleInput"
                  value={updatedTitle}
                  onChange={e => setUpdatedTitle(e.target.value)}
                />
              ) : (
                todo.title
              )}
            </Title>
            {todo.imagePath && <Img src={`http://localhost:33088/${todo.imagePath}`} alt="Todo" />}

            <Content>
              {isEditing ? (
                <ContentTextarea
                  id="contentInput"
                  maxLength={600}
                  value={updatedContent}
                  onChange={e => setUpdatedContent(e.target.value)}
                />
              ) : (
                todo.content
              )}
            </Content>
            <BtnsBox>
              <EditBtn onClick={handleEditClick}>{isEditing ? 'UPDATE' : 'EDIT'}</EditBtn>
              {isEditing ? (
                <DeleteBtn
                  onClick={() => {
                    setIsEditing(false);
                  }}>
                  CANCEL
                </DeleteBtn>
              ) : (
                <DeleteBtn onClick={handleDeleteClick}>DELETE</DeleteBtn>
              )}
            </BtnsBox>
          </TodoDetailWrap>
        </div>
      </div>
    </div>
  );
}

const TodoDetailWrap = styled.div`
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  width: 500px;
  max-width: calc(100% - 110px);
`;

const PatchBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  &:div {
    margin: 0 10px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  padding-top: 24px;
  padding-bottom: 24px;
  font-weight: bold;
  margin: 0;
`;

const Content = styled.p`
  font-size: 20px;
  min-height: 480px;
  max-height: 480px;
  overflow: scroll;
  margin-bottom: 30px;
  line-height: 28px;
`;

const BtnsBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
`;

const EditBtn = styled.button`
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  min-width: 30%;
  border: 1px solid #2d77af;
  background-color: #2d77af;
  color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  &:hover {
    border: 1px solid #2d77af;
    background-color: white;
    color: #2d77af;
    box-sizing: border-box;
  }
`;

const DeleteBtn = styled.button`
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 10px;
  border: none;
  min-width: 30%;
  border: 1px solid #d93d3d;
  background-color: #d93d3d;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 1px solid #d93d3d;
    background-color: white;
    color: #d93d3d;
    box-sizing: border-box;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 20px 10px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const ContentTextarea = styled.textarea<{ maxLength?: number }>`
  width: 100%;
  height: 400px;
  resize: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  &:focus {
    outline: none;
  }
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

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;
