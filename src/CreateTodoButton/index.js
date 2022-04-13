import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {

  const onClickButton = () => {
    /* A todos los actualizadores de estado (setAlgo) le podemos enviar 
    el valor directo al que queremos actualizarlo, o una funcion que devuelve
    el estado anterior a nuestra actualización y retorno el estado nuevo a través
    de una arrow function. En el ej. setOpenModal(oldState => newState )
    */ 
    props.setOpenModal(valor => !valor) // Cambia true x false y false x true (TOOGLE).
  }
  return (

    <div className="contenedorboton">
        <button className={'CreateTodoButton'} onClick={onClickButton}>
          +
        </button>
    </div>

  );
}

export { CreateTodoButton };
