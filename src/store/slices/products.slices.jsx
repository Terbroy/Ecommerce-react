import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { isLoading } from './loading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        
        setProducts: (state , actions) => {
            return actions.payload
        }

    }
})

export const getProductsThunk = ( ) => dispatch => {
    dispatch(isLoading(true))
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products/')
            .then(res => dispatch(setProducts(res.data)))
            .finally(() => dispatch(isLoading(false)))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
