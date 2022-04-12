import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import './App.css'

function AppUI() {

  return (
    <React.Fragment>
      <div className='main-container'>
        <TodoCounter />
        <TodoSearch />

        <TodoContext.Consumer>
          {/* {({que estados voy a consumir del provider}) => (quien los consume)} */}
          {({
            error,
            loading,
            searchedTodos,
            completeTodo,
            deleteTodo,
          }) => (
            <TodoList>
              {error && <p>Desespera, hubo un error</p>}
              {loading && <p>Esta cargando, tranqui</p>}
              {(!loading && !searchedTodos.lenght) && <p>Crea tu 1er TODO</p>}

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
          )}
        </TodoContext.Consumer>

        <CreateTodoButton />
      </div>
    </React.Fragment>
  );
}

export { AppUI };
