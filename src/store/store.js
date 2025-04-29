import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './categorySlice';
import activeTabReducer from './activeTabSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        activeTab: activeTabReducer,
        search: searchReducer,
    }
});