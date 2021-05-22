import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {filterDietTwo } from '../../actions';
import s from '../SearchBar/searchBar.module.css'

export function Filter() {
  const dispatch = useDispatch()
  const types = useSelector((store) => store.types);
 




  const handleFilter = (e) => {
    dispatch(filterDietTwo(e.target.value));
  };

 


  return (
    <div className="filter">
      <div>
        <p>Filter by </p>
        <select className={s.dieta} onChange={(e) => handleFilter(e)}>
         <option disabled>Filter By</option>
          <option>All</option>
          {types.map((type) => (
            <option value={type.title}>{type.title.charAt(0).toUpperCase()+ type.title.slice(1)}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;