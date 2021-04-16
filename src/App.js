import React, { useEffect } from 'react';
import Search from 'components/Search';
import ErrorBoundary from 'common/ErrorBoundary';
import Table from './components/Table';
import OrderCard from './components/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersRequest } from 'actions';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, []);
  const isCardOpened = useSelector(state => state.orders.isCardOpened);
  return <>
    <Search/>
    <ErrorBoundary>
      <div className='orders-wrapper'>
        {isCardOpened &&
        <OrderCard/>
        }
        <Table/>
      </div>
    </ErrorBoundary>
  </>;
};

export default App;
