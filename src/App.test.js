import { renderHook } from '@testing-library/react';
import { act } from 'react';
import App from './App';
import { useTodo } from './hooks/useTodo';
import { INITIAL_TODO_LIST } from './constants/data';

describe('useTodo, Hooksテスト', () => {
  describe('【関数テスト】handleAddTodoChange', () => {
    test('【正常系】addInputValueを更新できること', () => {
      const expectValue = 'テスト';

      const eventObject = {
        target: {
          value: expectValue,
        },
      };

      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe('');
      act(() => result.current.handleAddInputTitleChange(eventObject));
      expect(result.current.addInputValue).toBe(expectValue);
    });
  });

  // describe('【関数テスト】handleAddTodo', () => {
  //   test('【正常系】');
  // });
});
