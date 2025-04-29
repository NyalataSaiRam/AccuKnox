// store/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        setSearchQuery: (state, action) => action.payload,
        clearSearchQuery: () => '',
    },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
