import React from "react";
import { TodoContext } from "../TodoContext";

import './TodoForm.css'

function TodoForm() {

    const { addTodo, setOpenModal } = React.useContext(TodoContext);
    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onChange = (event) => { // Capturo el evento de la escritura del usuario en el textarea
        setNewTodoValue(event.target.value);
    }
    const onCancel = () => {
        setOpenModal(false);
    }
    const onSubmit = (event) => { // Capturo el evento de los usuarios en el argumento event, que por defecto es recargar la pagina
        event.preventDefault(); // La acción por defecto de envio de formularios es recargar la pagina, con esto lo evito
        addTodo(newTodoValue);
        setOpenModal(false);
    }
    return (
        <form onSubmit={onSubmit} >
            <label>Escribe tu nuevo To Do</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Escribe una nueva tarea"
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    className="TodoForm-button TodoForm-button-cancel"
                    onClick={onCancel}
                >
                    Cancelar
                </button>

                <button
                    className="TodoForm-button TodoForm-button-add"
                    type="submit"
                >
                    Añadir
                </button>
            </div>
        </form>
    );
}

export { TodoForm }