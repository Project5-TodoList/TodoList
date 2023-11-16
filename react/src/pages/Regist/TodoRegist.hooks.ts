import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { createTodo } from '@/api/TodoAPI';

export const useTodoForm = () => {
  const [titleInput, setTitleInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentInput(e.target.value);
  };

  return {
    titleInput,
    handleTitleChange,
    contentInput,
    handleContentChange,
  };
};

export const useTodoSubmit = () => {
  const navigate = useNavigate();

  const handleSubmitForm = async (title, content, imagePath) => {
    const response = await fetch('http://localhost:33088/api/todolist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imagePath }), // imagePath 포함하여 전송
    });

    const data = await response.json();
    if (data.ok) {
      navigate('/'); // 성공 시 홈으로 이동
    } else {
      // 오류 처리
    }
  };

  return handleSubmitForm;
};
