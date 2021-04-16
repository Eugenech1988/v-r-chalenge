import * as types from 'actionTypes';


const initialState = {
  ordersArray: [],
  filteredArray: null,
  searchField: '',
  currentPage: 1,
  ordersError: null,
  isCardOpened: false,
  cardItems: null,
  sortBy: '',
  sortOrder: 'asc' | 'desc',
  loading: false
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_ORDERS_SUCCESS:
      return { ...state, ordersArray: action.payload, loading: false };
    case types.FETCH_ORDERS_ERROR:
      return { ...state, ordersError: action.error, loading: false };
    case types.TOGGLE_ORDER_CARD:
      return { ...state, isCardOpened: !state.isCardOpened, cardItems: action.payload };
    case types.SEARCH_ORDERS:
      return { ...state, filteredArray: action.payload };
    case types.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case types.SET_SEARCH_FIELD:
      return { ...state, searchField: action.payload };
    case types.SET_TABLE_SORTING:
      return { ...state, sortBy: action.name, sortOrder: action.dest };
    default:
      return { ...state };
  }
};

export default ordersReducer;
