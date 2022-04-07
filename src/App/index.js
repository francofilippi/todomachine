import React from 'react';
import { AppUI } from './AppUI'

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Pintar un cuadro', completed: true },
//   { text: 'Escuchar una cancion', completed: true }
// ];

function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1'); //guardo los items del localstorage en una variable
  let parsedTodos;

  if (!localStorageTodos) {//con anticipar el signo ! verifico si localStorageTodos es null/undefined/false/string vacio
    localStorage.setItem('TODOS_V1', JSON.stringify([])); // creo un array vacio en localStorage. como localstorage solo puede guardar informacion en strings, se lo paso a través de JSON.stringify
    parsedTodos = []; // creo un array vacío para acá, la aplicacion
  } else {
    parsedTodos = JSON.parse(localStorageTodos); //con JSON.parse convierto lo de localStorage que está en JSON string, a formato de objetos normal de Javascript
  }

  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState('');

  //filtramos los todos para saber cuantos se completaron, y luego lo pasamos al componente TodoCounter
  const completedTodos = todos.filter(todo => !!todo.completed).length //el doble !! es para evaluar si es verdadero, a diferencia de uno solo ! que evalua si es falso
  const totalTodos = todos.length;


  //filtramos los todos para que aparezcan o no dependiendo de lo que escriban en el componente TodoSearch
  let searchedTodos = [];
  if (!searchValue.length >= 1) { //si los usuarios no escribieron nada, osea si el largo de searchValue no es igual o mayor a 1, el nuevo array va a ser igual a la lista todos
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => { //llamamos a cada todo y por cada uno..
      const todoText = todo.text.toLowerCase(); //convertimos sus textos a minusculas para comparar luego con el searchValue
      const searchText = searchValue.toLowerCase(); //convertimos el searchValue a minusculas para comparar luego con el texto de los todos
      return todoText.includes(searchText); //valida que cada elemento del array recorrido cumpla esta linea y los que cumplen lo agrega al nuevo array searchedTodos
    })
  }

  //funcion para no sólo guardar/actualizar los nuevos Todos (cuando completo o borro un todo) en el estado de nuestro componente sino también en localStorage
  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos); // paso los nuevos todos a un JSON string
    localStorage.setItem('TODOS_V1', stringifiedTodos); // guardo en localstorage en el item TODOS_V1 estos nuevos todos pasados a JSONstring
    setTodos(newTodos);
  };
  //Se ejecuta esta funcion cuando marco un todo como completado (click en el tilde)
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);//examinamos todo x todo cual tiene ese mismo texto que le pasamos y cuando lo encontremos guardamos la posicion en esta variable todoIndex

    const newTodos = [...todos] // nuevo array que sea una copia exacta de los todos que ya teniamos en el otro array todos
    newTodos[todoIndex].completed = true; // cambia el valor de la propiedad completed a true del todo que buscamos antes en el findIndex
    saveTodos(newTodos);

    //todos[todoIndex].completed = true;
    //es lo mismo hacer esto de abajo que lo de arriba
    // todos[todoIndex] = {
    //   text: todos[todoIndex].text,
    //   completed: true
    // }
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
