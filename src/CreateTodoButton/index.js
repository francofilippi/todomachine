import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {

  const onClickButton = (msg) => {
    alert(msg)
  }
  return (
    <div className="contenedorboton">
      <button className="CreateTodoButton" onClick={() => onClickButton('jajaj')}>
        +
      </button>
    </div>
  );
}

export { CreateTodoButton };
