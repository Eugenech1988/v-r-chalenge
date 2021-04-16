import React from 'react';
import NoResults from 'components/NoResults';
import Pagination from 'components/Pagination';
import styles from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setTableSorting, toggleOrderCard } from 'actions';
import { MAX_PAGE_SIZE } from 'constans';
import _orderBy from 'lodash/orderBy';


const Table = () => {
  const ordersArray = useSelector(state => state.orders && _orderBy(state.orders.ordersArray, [state.orders.sortBy], [state.orders.sortOrder]));
  const ordersDest = useSelector(state => state.orders.sortOrder);
  const filteredArray = useSelector(state => state.orders.filteredArray);
  const currentPage = useSelector(state => state.orders.currentPage);
  const dispatch = useDispatch();
  const showingArray = filteredArray ? filteredArray : ordersArray;
  const itemsPerPage = MAX_PAGE_SIZE;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageNumbers = [];
  let currentLists;
  if (showingArray) {
    currentLists = showingArray.slice(indexOfFirstItem, indexOfLastItem);
    for (let i = 1; i <= Math.ceil(showingArray.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const handleOrderClick = order => (e) => {
    dispatch(toggleOrderCard(order));
  };

  const handleSort = (sortingItem) => (e)  => {
    // eslint-disable-next-line
    if (ordersDest === 'asc') {
      dispatch(setTableSorting(sortingItem, 'desc'));
    } else {
      dispatch(setTableSorting(sortingItem, 'asc'));
    }
  };

  return (
    <>
      {
        showingArray && showingArray.length ?
          <div className={styles.gridWrapper}>
            <table className={styles.grid}>
              <thead>
                <tr>
                  <th className={styles.gridHeadCell} onClick={handleSort('id')} >ID</th>
                  <th className={styles.gridHeadCell} onClick={handleSort('service')}>Service</th>
                  <th className={styles.gridHeadCell} onClick={handleSort('name')}>Name</th>
                  <th className={styles.gridHeadCell} onClick={handleSort('total')}>Total</th>
                  <th className={styles.gridHeadCell} onClick={handleSort('status')}>Status</th>
                  <th className={styles.gridHeadCell} onClick={handleSort('userId')}>User ID</th>
                </tr>
              </thead>
              <tbody>
                {currentLists.map(order => (
                  <tr
                    key={order.id}
                    className={styles.orderRow}
                    onClick={handleOrderClick(order)}
                  >
                    <td>{order.id}</td>
                    <td>{order.service}</td>
                    <td>{order.name}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                    <td>{order.userId}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
            <Pagination
              pageNumbers={pageNumbers}
            />
          </div> :
          <NoResults/>
      }
    </>
  );
};

export default Table;
