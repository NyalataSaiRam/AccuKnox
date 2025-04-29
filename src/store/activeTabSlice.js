import { createSlice } from "@reduxjs/toolkit";

import categories from '../data/categories.json';

const InitialcatsList = categories.filter(c => c.id == 1)[ 0 ].chartData.map(c => ({ id: c.id, title: c.title, show: c.show }));

const activeTabSlice = createSlice({
    name: "ActiveTab",
    initialState: InitialcatsList,
    reducers: {
        tabChanged(state, action) {
            return [ ...categories.filter(c => c.id == action.payload)[ 0 ].chartData.map(c => ({ id: c.id, title: c.title, show: c.show })) ];
        },
        toggleChechbox(state, action) {
            return state.map(item => {
                if (action.payload.includes(item.id)) {
                    return {
                        ...item,
                        show: !item.show
                    };
                } else {
                    return item;
                }
            });
        },
        toggleChechboxById(state, action) {
            return state.map(item => {
                if (item.id == action.payload) {
                    return {
                        ...item,
                        show: !item.show
                    };
                } else {
                    return item;
                }
            });
        }
    }
});

export const { tabChanged, toggleChechbox, toggleChechboxById } = activeTabSlice.actions;
export default activeTabSlice.reducer;
