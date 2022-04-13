import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span 
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete} // Cuando le doy click al check, llamo a onComplete que es una propiedad del TodoItem y a su vez una arrow function
      >
        √
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>
      <span 
        className="Icon Icon-delete"
        onClick={props.onDelete} // Cuando le doy click a la cruz, llamo a la funcion onDelete que es una propiedad del TodoItem y a su vez una arrow function
        >
        X
      </span>
    </li>
  );
}

export { TodoItem };
