import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { isLoading } from './loading.slice';

export const cartProductsSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state , action) => {
            console.log(action.payload);
            return action.payload
        }
    }
})

export const productsCartThunk = ( ) => (dispatch) => {
    dispatch(isLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart/', getConfig())
        .then(res =>dispatch(setCart(res.data.data.cart)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}

export const addCartThunk = (data) => (dispatch) => {
    dispatch(isLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart/', data,getConfig())
        .then(() =>dispatch(productsCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(isLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases/', { } , getConfig())
        .then(()=>dispatch(setCart([])))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}

export const deleteCartThunk = (data) => (dispatch) => {
    dispatch(isLoading(true));
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${data}`, getConfig())
        .then(()=>dispatch(productsCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}


export const { setCart  } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
