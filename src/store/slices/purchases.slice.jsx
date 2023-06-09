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

export const purchasesThunk = ( ) => async dispatch => {
    dispatch(isLoading(true));
    return await axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases/', getConfig())
        .then(res => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(isLoading(false)))
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
