import { configureStore } from '@reduxjs/toolkit'
import  cartProductsSlice  from './slices/cartProducts.slice'
import loadingSlice  from './slices/loading.slice'
import productsSlice  from './slices/products.slices'
import  purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        loading: loadingSlice,
        products: productsSlice,
        purchases: purchasesSlice,
        cart: cartProductsSlice
    }
})
