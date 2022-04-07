import React from 'react';
import './TodoCounter.css';

function TodoCounter({total, completed}) {
  return (
    <h2 className="TodoCounter">Has completado {completed} de <br/> {total} TODOs</h2>
  );
}

export { TodoCounter };
