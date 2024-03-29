import React from 'react';
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { getCountryByName } from'../../redux/actions'
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');

  const handleSetName = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  const handleSearchName = (e) => {
    e.preventDefault();
    country ===''?alert('must introduce values for search'):
    dispatch(getCountryByName(country));
    setCountry('');
  };
  return (
    <div className={styles.cont} > 
      <input
        className={styles.search}
        type="text"
        value={country}
        placeholder="Search Country by Name"
        onChange={(e) => handleSetName(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSearchName(e)}
        className={styles.btnS} > 
        Search
      </button>
    </div>
  );
}