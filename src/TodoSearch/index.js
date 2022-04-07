import React from 'react';
import './TodoSearch.css';

function TodoSearch(props) {

  // const [searchValue, setSearchValue] = React.useState('');
  //const [estado, fxquecambiaelestado] = React.useState(estadoinicial); 


  const onSearchValueChange = (event) => {
    console.log(event.target.value)
    props.setSearchValue(event.target.value)
  };
  return (
    <input
      className="TodoSearch"
      placeholder="Cebolla"
      value={props.searchValue}
      onChange={onSearchValueChange}
    />
  )
}

export { TodoSearch };
