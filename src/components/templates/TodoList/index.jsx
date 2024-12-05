/**
 * TodoListTemplate
 *
 * @package templates
 */
import { useMemo, useState } from 'react';
import styles from './styles.module.css';
import {
  INITIAL_TODO_LIST,
  INITIAL_TODO_LIST_LENGTH,
} from '../../../constants/data';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * TodoListTemplate
 * @returns {JSX.E}
 */
export const TodoListTemplate = () => {
  /* state定義 */
  const [addInputValue, setAddInputValue] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [todoLength, setTodoLength] = useState(INITIAL_TODO_LIST_LENGTH);
  const [originTodoList, setOriginTodoList] = useState(INITIAL_TODO_LIST);

  /* action定義 */
  /**
   * inputの値更新機能
   */
  const handleAddTodoChange = (e) => setAddInputValue(e.target.value);
  const handleSearchKeyWordChange = (e) => setSearchKeyWord(e.target.value);

  /**
   * todoList検索機能
   */
  const showTodoList = useMemo(() => {
    const regexp = new RegExp('^' + searchKeyWord, 'i');
    return originTodoList.filter((todo) => {
      return todo.title.match(regexp);
    });
  }, [originTodoList, searchKeyWord]);

  /**
   * todo追加機能
   */
  const handleAddTodo = (e) => {
    if (addInputValue !== '' && e.key === 'Enter') {
      const newId = todoLength + 1;
      setOriginTodoList([
        ...originTodoList,
        {
          id: newId,
          title: addInputValue,
        },
      ]);
      setTodoLength(newId);
      setAddInputValue('');
    }
  };

  /**
   * todo削除機能
   * @param {string} targetId
   * @param {string} targetTitle
   */
  const handleDeleteTodo = (targetId, targetTodo) => {
    if (window.confirm(`${targetTodo}を本当に削除しますか?`)) {
      const newTodoList = originTodoList.filter(
        (todo) => targetId !== Number(todo.id)
      );
      console.log(newTodoList);
      setOriginTodoList(newTodoList);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        <h2 className={styles.subtitle}>ADD TODO</h2>
        <input
          className={styles.input}
          type={'text'}
          placeholder={'New Todo'}
          value={addInputValue}
          onChange={handleAddTodoChange}
          onKeyDown={handleAddTodo}
        />
      </section>
      <section className={styles.common}>
        <input
          className={styles.input}
          type={'text'}
          placeholder={'Search KeyWord'}
          value={searchKeyWord}
          onChange={handleSearchKeyWordChange}
        />
      </section>
      <section className={styles.common}>
        {showTodoList.length > 0 && (
          <ul className={styles.list}>
            {showTodoList.map((todo) => (
              <li key={todo.id} className={styles.item}>
                <span className={styles.task}>{todo.title}</span>
                <div className={styles.icon}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="lg"
                    onClick={() => handleDeleteTodo(todo.id, todo.title)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
