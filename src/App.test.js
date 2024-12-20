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

  describe('【関数テスト】handleAddTodo', () => {
    // 予測値
    let expectTodoList = [];
    // 引数
    let eventObject = {
      target: {
        value: 'テスト',
      },
      key: 'Enter',
    };
    test('【正常系】todoList, uniqueIdが更新されること、addInputValueがリセットされること', () => {
      // 予測値
      const expectTodoTitle = 'Todo3';
      expectTodoList = [
        ...INITIAL_TODO_LIST,
        {
          id: 3,
          title: expectTodoTitle,
        },
      ];
      // 引数
      eventObject.target.value = expectTodoTitle;

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe('');
      // hooks関数の実行(addInputValueの更新)
      act(() => result.current.handleAddInputTitleChange(eventObject));
      expect(result.current.addInputValue).toBe(expectTodoTitle);

      // hooks関数の実行(handleAddInputTitleChangeの実行)
      act(() => result.current.handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されたこと
      expect(result.current.showTodoList).toEqual(expectTodoList);
      // 入力値(addInputValue)がリセットされたこと
      expect(result.current.addInputValue).toBe('');
    });
    test('【正常系】エンターキーを押していない場合、処理が発生しないこと', () => {
      // 予測値
      const expectTodoTitle = 'Todo3';
      expectTodoList = [
        ...INITIAL_TODO_LIST,
        {
          id: 3,
          title: expectTodoTitle,
        },
      ];
      // 引数
      eventObject.target.value = expectTodoTitle;
      eventObject.key = '';
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe('');
      // hooks関数の実行(addInputValueの更新)
      act(() => result.current.handleAddInputTitleChange(eventObject));
      expect(result.current.addInputValue).toBe(expectTodoTitle);
      // hooks関数の実行(handleAddInputTitleChangeの実行)
      act(() => result.current.handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current.showTodoList).not.toEqual(expectTodoList);
      // 入力値(addInputValue)がリセットされない
      expect(result.current.addInputValue).not.toBe('');
    });
    test('【正常系】入力値がない場合、処理が発生しないこと', () => {
      // 予測値
      const expectTodoTitle = 'Todo5';
      expectTodoList = [
        ...INITIAL_TODO_LIST,
        {
          id: 3,
          title: expectTodoTitle,
        },
      ];
      // 引数
      eventObject.target.value = '';
      eventObject.key = '';
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current.addInputValue).toBe('');
      // hooks関数の実行(addInputValueの更新)
      act(() => result.current.handleAddInputTitleChange(eventObject));
      expect(result.current.addInputValue).toBe('');
      // hooks関数の実行(handleAddInputTitleChangeの実行)
      act(() => result.current.handleAddTodo(eventObject));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current.showTodoList).not.toEqual(expectTodoList);
      // 入力値(addInputValue)がリセットされない
      expect(result.current.addInputValue).not.toBe(expectTodoTitle);
    });
  });

  describe('【関数テスト】handleDeleteTodo', () => {
    // 予測値
    let expectTodoList = [];

    beforeEach(() => {
      // 予測値を初期化
      expectTodoList = [];
    });
    test('【正常系】todoが削除されること', () => {
      // 引数
      const targetId = 1;
      const targetTitle = 'テスト';

      window.confirm = jest.fn().mockReturnValueOnce(true);
      // 予測値
      expectTodoList = INITIAL_TODO_LIST.filter((todo) => todo.id !== targetId);
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      act(() => result.current.handleDeleteTodo(targetId, targetTitle));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current.showTodoList).toEqual(expectTodoList);
    });
    test('【正常系】confirmでキャンセルをクリックした場合、todoが削除されないこと', () => {
      // 引数
      const targetId = 1;
      const targetTitle = 'sample';

      window.confirm = jest.fn().mockReturnValueOnce(false);
      // 予測値
      expectTodoList = INITIAL_TODO_LIST;
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      act(() => result.current.handleDeleteTodo(targetId, targetTitle));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current.showTodoList).toEqual(expectTodoList);
    });
  });
  describe('【関数テスト】handleSearchTodo', () => {
    test('【正常系】検索ワードがある場合、検索された結果が反映される', () => {
      // 予測値
      const expectValue = [INITIAL_TODO_LIST[0]];
      // 引数
      const eventObject = {
        target: {
          value: 'Todo1',
        },
      };

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行
      act(() => result.current.handleSearchKeyWordChange(eventObject));
      // 結果判定
      expect(result.current.showTodoList).toEqual(expectValue);
    });
    test('【正常系】検索ワードがない場合、元のTodoリストが反映される', () => {
      // 予測値
      const expectValue = INITIAL_TODO_LIST;
      // 引数
      const eventObject = {
        target: {
          value: 'Todo1',
        },
      };

      eventObject.target.value = '';
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行
      act(() => result.current.handleSearchKeyWordChange(eventObject));
      // 結果判定
      expect(result.current.showTodoList).toEqual(expectValue);
    });
  });
});
