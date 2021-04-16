import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../actions';


const Pagination = (props) => {
  const currentPage = useSelector(state => state.orders.currentPage);
  const dispatch = useDispatch();
  const handlePrevClick = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };
  const handleNextClick = () => {
    if (currentPage < props.pageNumbers.length) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePaginationClick = (e) => {
    dispatch(setCurrentPage(e.target.id));
  };

  return (
    <>
      {
        props.pageNumbers.length > 1 &&
        <div className={styles.paginationWrapper} id='page-numbers'>
          <span className={styles.paginationLeft} onClick={handlePrevClick}>
            {'<'}
          </span>
          <ul className={styles.paginationNumbers}>
            {props.pageNumbers.map(number => (
              <li
                key={number}
                id={number}
                onClick={handlePaginationClick}
                className={`${styles.paginationNumber}${number === currentPage ? ' active' : ''}`}
              >
                {number}
              </li>
            )
            )}
          </ul>
          <span className={styles.paginationRight} onClick={handleNextClick}>
            {'>'}
          </span>
        </div>
      }
    </>
  );
}
;

Pagination.propTypes =
{
  pageNumbers: PropTypes.array
}
;

export default Pagination;
