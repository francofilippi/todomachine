import React from "react";

// Custom hook
function useLocalStorage(itemName, initialValue) {

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
  
    /* uso un reactHook dentro de mi custom hook. 
      Para mantener actualizado el estado de este item. 
      Le paso el valor inicial del item, que en el caso de TODOS_V1 es un [] */
    const [item, setItem] = React.useState(initialValue);
  
    /* React.useEffect: 
    React hook que nos permite ejecutar cierto codigo 
    justo antes hacer el render de nuestro componente, y dependiendo de ciertas condiciones (2do arg). 
      2do argumento = [] , nuestro efecto solo se ejecute una vez, antes de hacer el primer render de nuestro componente. 
      2do argumento = [elemento1, elemento2, etc] , nuestro efecto no solo se ejecuta antes del primer render, sino también cuando haya cambios en esos elementos del array.
      2do argumento = vacío , nuestro efecto se ejecuta antes de cada render del componente.            
      */
    React.useEffect(() => {

      setTimeout(() => { // Simulamos el tiempo de espera como si fuera una API real..
  
        try {
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
  
          setItem(parsedItem);
          setLoading(false);
          console.log('use effect')

        } catch (error) {
          setError(error);
        }
  
      }, 1000)

    },[]); // 2do argumento de useEffect es un [], entonces se va a ejecutar 1 vez, cuando renderiza por 1era vez nuestro componente
  
  
    /* Funcion para no sólo guardar/actualizar los 
      nuevos Todos (cuando completo o borro un todo) 
      en el estado de nuestro componente sino también en localStorage
      No la ponemos dentro del useEffect porque no se va a ejecutar por defecto, 
      sino unicamente cuando se actualiza el item.
      */
    const saveItem = (newItem) => {
  
      try {

        // paso los nuevos Item a un JSON string
        const stringifiedItem = JSON.stringify(newItem);
  
        // guardo en localstorage en itemName estos nuevos Item pasados a JSONstring
        localStorage.setItem(itemName, stringifiedItem);
  
        // guardo en la aplicacion estos nuevos Item
        setItem(newItem);

      } catch (error) {
        setError(error);
      }
  
    };
  
    /* Por convención de react, la funcion devuelve un array con 2 elementos. 
    O un objeto si estamos trabajando con más de 2 estados */
    return { item, saveItem, loading, error };
  }

  export { useLocalStorage };