import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { isLoading } from './loading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state , action) => {
            return action.payload
        }
    }
})

export const purchasesThunk = ( ) => dispatch => {
    dispatch(isLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases/', getConfig())
        .then(res => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(isLoading(false)))
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
