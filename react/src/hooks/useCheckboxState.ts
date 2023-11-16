import { useEffect, useState, useRef } from 'react';
import { updateChecked } from '@/api/TodoAPI';

export const useCheckboxState = initialTodo => {
  const [isChecked, setIsChecked] = useState(initialTodo.done);
  const throttleTimer = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    updateChecked(initialTodo._id, initialTodo.title, initialTodo.content, isChecked).catch(error => {
      console.error('Error updating checked state:', error);
    });
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(initialTodo.done);
  }, [initialTodo.done]);

  const handleCheckboxChange = () => {
    if (!throttleTimer.current) {
      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 500);

      if (initialTodo._id !== undefined) {
        try {
          const updatedStatus = !isChecked;
          updateChecked(initialTodo._id, initialTodo.title, initialTodo.content, updatedStatus).then(() =>
            setIsChecked(updatedStatus),
          );
        } catch (error) {
          console.error('Error updating checked state:', error);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current);
      }
    };
  }, []);

  return { isChecked, handleCheckboxChange };
};
