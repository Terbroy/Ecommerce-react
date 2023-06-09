import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { isLoading } from './loading.slice';

export const cartProductsSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state , action) => {
            return action.payload
        }
    }
})

export const productsCartThunk = ( ) => async dispatch => {
    dispatch(isLoading(true));
    return  await axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart/', getConfig())
        .then(res => dispatch(setCart(res.data)))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(isLoading(false)));
}

export const addCartThunk = (data) => async dispatch => {
    dispatch(isLoading(true));
    return await axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart/', data, getConfig())
        .then(() =>dispatch(productsCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}

export const purchaseCartThunk = () => async dispatch => {
    dispatch(isLoading(true));
    return await axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases/', { } , getConfig())
        .then(()=>dispatch(setCart([])))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}

export const deleteCartThunk = (data) => async dispatch => {
    dispatch(isLoading(true));
    return await axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${data}/`, getConfig())
        .then(()=>dispatch(productsCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}

export const updateCartThunk = (id, data) => async dispatch => {
    dispatch(isLoading(true));
    return await axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`, data, getConfig())
        .then(()=>dispatch(productsCartThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(isLoading(false)));
}


export const { setCart  } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
