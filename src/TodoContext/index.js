import React from "react";
import { useLocalStorage } from "./useLocalStorage";

/* React.createContext
    Utilidad: dejo de pasar los estados a través de props, y creo un contexto (un provedor y un consumidor de estados)
    Envolvemos la app en un provider que tiene todo el estado que vamos a compartir en toda la app,
    y un consumer que sin importar donde estén nuestros componentes (hijo nieto o tataranieto), estos van
    a poder conectarse a ese consumer para recibir el estado del provider sin tener que pasar por props.
    Como compartimos esos estados entre el provider y el consumer ? con un puente o función, en este caso la fx TodoProvider
    */
// Creamos un objeto TodoContext = { unProvider, unConsumer } = {TodoContext.Provider, TodoContext.Consumer}
const TodoContext = React.createContext();

function TodoProvider(props) { // Puente o fx entre TodoConext.Provider y TodoContext.Consumer

    /* Llamo al custom hook, devuelve los estados y los renombro para trabajarlos en la aplicación. */
    const {
        item: todos, /* ejemplo, item que viene de useLocalStorage lo renombro a todos */
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);

    // Estado para abrir o cerrar modal
    const [openModal, setOpenModal] = React.useState(false);

    // Estado para el input de search
    const [searchValue, setSearchValue] = React.useState('');

    // Filtro los todos completados
    const completedTodos = todos.filter(todo => !!todo.completed).length
    // Cuantos todos tengo
    const totalTodos = todos.length;

    // Filtro los todos según búsqueda 
    let searchedTodos = [];
    if (!searchValue.length >= 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        })
    }

    // Agregar un Todo, conformar nuevo array de Todos, salvarlo en useLocalStorage
    const addTodo = (text) => {
        const newTodos = [...todos]
        newTodos.push({
            text: text, 
            completed: false,
        });
        saveTodos(newTodos);
    }

    // Marcar un Todo como completado, conformar nuevo array de Todos, salvarlo en useLocalStorage
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos]
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    }

    // Eliminar un Todo, conformar nuevo array de Todos, salvarlo en useLocalStorage
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    }

    return (
        <TodoContext.Provider value={{ // En un objeto van todas las propiedades, metodos y atributos que quiero compartir con mi provider
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}>
            {props.children} {/* Envolvemos en nuestro provedor a todo lo que mandemos dentro de nuestro TodoProvider */}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };