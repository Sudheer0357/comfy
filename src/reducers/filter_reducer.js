import { act } from 'react-dom/test-utils';
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = state.filtered_products.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      products_loading: true,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products: products } = state;

    let tempProducts = [...products];

    if (sort === 'price-lowest') {
      tempProducts = products.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-highest') {
      tempProducts = products.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name-a') {
      tempProducts = products.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'name-z') {
      tempProducts = products.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    console.log(price);

    let tempProducts = [...all_products];

    //filtering

    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }

    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) =>
        product.colors.find((c) => c === color)
      );
    }

    // tempProducts = tempProducts.filter((product) => {
    //   return product.price <= price;
    // });

    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
