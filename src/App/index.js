import React from 'react';
import { AppUI } from './AppUI'

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Pintar un cuadro', completed: true },
//   { text: 'Escuchar una cancion', completed: true }
// ];

// Custom hook
function useLocalStorage(itemName, initialValue) {

  // Guardo los items del localstorage en una variable
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  /* Con anticipar el signo ! verifico si localStorageItem 
    es null/undefined/false/string vacio. */
  if (!localStorageItem) {

    /* Cargo el item de localStorage con el initialValue. 
      como localstorage solo puede guardar informacion en strings, 
      se lo paso a través de JSON.stringify */
    localStorage.setItem(itemName, JSON.stringify(initialValue));

    // guardo el item en una variable para acá, la aplicación
    parsedItem = initialValue;

  } else { // si no está vacío..

    /* con JSON.parse convierto lo de localStorage que está en 
    JSON string, a formato de objetos normal de Javascript */
    parsedItem = JSON.parse(localStorageItem);

  }

  /* uso un reactHook dentro de mi custom hook. 
    Para mantener actualizado el estado de este item. 
    En parsedItem le paso el valor que ya existia en localStorage, 
    o en su defecto un array vacío [] */
  const [item, setItem] = React.useState(parsedItem);

  /* Funcion para no sólo guardar/actualizar los 
    nuevos Todos (cuando completo o borro un todo) 
    en el estado de nuestro componente sino también en localStorage */
  const saveItem = (newItem) => {

    // paso los nuevos Item a un JSON string
    const stringifiedItem = JSON.stringify(newItem);

    // guardo en localstorage en itemName estos nuevos Item pasados a JSONstring
    localStorage.setItem(itemName, stringifiedItem);

    // guardo en la aplicacion estos nuevos Item
    setItem(newItem);

  };

  // La funcion devuelve el array con 2 elementos.
  return [item, saveItem];
}

function App() {

  // llamamos a la funcion useLocalStorage y debería devolvernos un array con 2 elementos
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []); 

  const [searchValue, setSearchValue] = React.useState('');

  /* Filtramos los todos para saber cuantos se completaron, 
  y luego lo pasamos al componente TodoCounter */
  const completedTodos = todos.filter(todo => !!todo.completed).length //el doble !! es para evaluar si es verdadero, a diferencia de uno solo ! que evalua si es falso
  const totalTodos = todos.length;

  /* Filtramos los todos para que aparezcan o no 
  dependiendo de lo que escriban en el componente TodoSearch */
  let searchedTodos = [];

  /* Si los usuarios no escribieron nada, 
    osea si el largo de searchValue no es igual o mayor a 1, 
    el nuevo array va a ser igual a la lista todos */
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => { //llamamos a cada todo y por cada uno..

      // Convertimos sus textos a minusculas para comparar luego con el searchValue
      const todoText = todo.text.toLowerCase();

      // Convertimos el searchValue a minusculas para comparar luego con el texto de los todos
      const searchText = searchValue.toLowerCase();

      /* Valida que cada elemento del array recorrido cumpla esta linea 
      y los que cumplen lo agrega al nuevo array searchedTodos */
      return todoText.includes(searchText);
    })
  }

  /* Se ejecuta esta funcion cuando marco 
    un todo como completado (click en el tilde) */
  const completeTodo = (text) => {

    /* Examinamos todo x todo cual tiene ese mismo texto 
      que le pasamos y cuando lo encontremos guardamos 
      la posicion en esta variable todoIndex */
    const todoIndex = todos.findIndex(todo => todo.text === text);

    /* Nuevo array que sea una copia exacta de los todos 
      que ya teniamos en el otro array todos */
    const newTodos = [...todos] 

    /* Cambia el valor de la propiedad completed a 
      true del todo que buscamos antes en el findIndex */
    newTodos[todoIndex].completed = true; 
    saveTodos(newTodos);

  }


  //Se ejecuta esta funcion cuando borro un todo (click en la cruz)
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);//examinamos todo x todo cual tiene ese mismo texto que le pasamos y cuando lo encontremos guardamos la posicion en esta variable todoIndex

    const newTodos = [...todos]; // nuevo array que sea una copia exacta de los todos que ya teniamos en el otro array todos
    newTodos.splice(todoIndex, 1); // cambia el valor de la propiedad completed a true del todo que buscamos antes en el findIndex
    saveTodos(newTodos);

  }

  
  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
