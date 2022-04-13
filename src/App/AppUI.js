import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodoForm } from '../TodoForm';
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';

import './App.css'

function AppUI() {

  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <div className='main-container'>
        <TodoCounter />
        <TodoSearch />

        <TodoList>
          {error && <TodosError />}
          {loading && <TodosLoading />}
          {(!loading && !searchedTodos.lenght) && <EmptyTodos />}

          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>

        {!!openModal && ( // Con la doble negación !! preguntamos si es true. No sólo si existe sino también que sea true..
          <Modal>
            <TodoForm />
          </Modal>
        )}

        <CreateTodoButton
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      </div>
    </React.Fragment >
  );
}

export { AppUI };
