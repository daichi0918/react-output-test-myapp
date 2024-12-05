/**
 * TodoListTemplate
 *
 * @package templates
 */
import styles from './styles.module.css';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTodo } from '../../../hooks/useTodo';

/**
 * TodoListTemplate
 * @returns {JSX.E}
 */
export const TodoListTemplate = () => {
  const {
    addInputValue,
    searchKeyWord,
    showTodoList,

    handleAddTodoChange,
    handleSearchKeyWordChange,
    handleAddTodo,
    handleDeleteTodo,
  } = useTodo();

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
