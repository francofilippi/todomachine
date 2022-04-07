import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
  // const onComplete =  () => {
  //   alert('ya completaste el todo ' + props.text);
  // }
  const onDelete =  () => {
    alert('borraste el todo ' + props.text);
  }
  return (
    <li className="TodoItem">
      <span 
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete} // cuando le doy click al check, llamo a la funcion onComplete que es una propiedad del TodoItem
      >
        √
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>
      <span 
        className="Icon Icon-delete"
        onClick={props.onDelete} // cuando le doy click a la cruz, llamo a la funcion onDelete que es una propiedad del TodoItem
        >
        X
      </span>
    </li>
  );
}

export { TodoItem };
