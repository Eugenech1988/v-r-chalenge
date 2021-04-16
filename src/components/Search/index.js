import React from 'react';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { searchOrders } from 'actions';
import { setSearchField } from 'actions';


const Search = () => {
  const orders = useSelector(state => state.orders.ordersArray);
  const value = useSelector(state => state.orders.searchField);
  const dispatch = useDispatch();
  const validateValue = (validValue) => {
    const regex = /^[0-9a-zA-Z ]*$/;

    return regex.test(validValue);
  };

  const searchData = () => {
    let filteredData;
    if (value) {
      filteredData = orders.filter(elem => (elem.id === value || elem.service === value));
      filteredData === '' && filteredData === null;
    }
    return filteredData;
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    return validateValue(searchValue) ? dispatch(setSearchField(searchValue)) : null;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter')
      dispatch(searchOrders(searchData()));
  };

  const handleSubmit = () => {
    dispatch(searchOrders(searchData()));
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        name='search'
        onChange={handleSearch}
        type='text'
        value={value}
        placeholder='Orders search'
        className={styles.searchInput}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSubmit} className={styles.searchSubmit}>
        Search
      </button>
    </div>
  );
};


export default Search;
