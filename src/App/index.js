import React from 'react';
import { TodoProvider } from '../TodoContext';
import { AppUI } from './AppUI'

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Pintar un cuadro', completed: true },
//   { text: 'Escuchar una cancion', completed: true }
// ];


function App() {

  return (
    /* Al englobar AppUI y todos sus componentes hijos en el TodoProvider, 
    estoy poniendo a disposición de ellos todos los estados del provider del TodoContext */
    <TodoProvider> 
      <AppUI />
    </TodoProvider>
  );
}

export default App;
