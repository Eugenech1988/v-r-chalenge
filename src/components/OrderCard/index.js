import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOrderCard, fetchOrdersRequest } from 'actions';
import { patchOrderName } from 'api';
import styles from './style.module.scss';


const OrderCard = () => {
  const items = useSelector(state => state.orders.cardItems);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const dispatch = useDispatch();
  const toggleOrder = () => dispatch(toggleOrderCard());
  const changItemName = (targetItem, def) => (e) => {
    if (e.key === 'Enter') {
      patchOrderName({
        items: items.items.map(item => item === targetItem ? ({ ...item, [def]: e.target.value }) : item)
      }, items.id).then(dispatch(fetchOrdersRequest()));
      nameRef.current.blur();
      descriptionRef.current.blur();
      quantityRef.current.blur();
      priceRef.current.blur();
      dispatch(fetchOrdersRequest());
    }
  };
  return (
    <div className={styles.orderCardOverlay} onClick={toggleOrder}>
      <div onClick={(e) => e.stopPropagation()} className={styles.orderCardWrapper}>
        <button className={styles.closeButton} onClick={toggleOrder}>X</button>
        {items &&
        <>
          <h3 className={styles.orderCardHeading}>Items list</h3>
          <div className={styles.orderBlock}>
            <ul className={styles.orderCardList}>
              {items.items.map((item, index) => (
                <li key={index} className={styles.orderCardListItem}>
                  <span><b>name:</b>
                    <input ref={nameRef} onKeyPress={changItemName(item, 'name')} className={styles.orderInput} type='text' defaultValue={item.name}/>
                  </span>
                  <span><b>description:</b>
                    <input ref={descriptionRef}  onKeyPress={changItemName(item, 'description')} type='text' className={styles.orderInput} defaultValue={item.description}/>
                  </span>
                  <span><b>price:</b>
                    <input ref={priceRef}  type='text' onKeyPress={changItemName(item, 'price')} defaultValue={item.price} className={styles.orderInput}/>
                  </span>
                  <span><b>quantity:</b>
                    <input ref={quantityRef}  className={styles.orderInput} onKeyPress={changItemName(item, 'quantity')} type='text' defaultValue={item.quantity}/>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
        }
      </div>
    </div>
  );
};


export default OrderCard;
