import { createSlice } from "@reduxjs/toolkit";

import categories from '../data/categories.json';

const categorySlice = createSlice(
    {
        name: "Categories",
        initialState: categories,
        reducers: {
            toggleShow(state, action) {
                const idsToToggle = new Set(action.payload);

                return state.map(parent => {
                    const updatedChartData = parent.chartData.map(item => {
                        if (idsToToggle.has(item.id)) {
                            return { ...item, show: !item.show };
                        }
                        return item;
                    });


                    if (updatedChartData !== parent.chartData) {
                        return { ...parent, chartData: updatedChartData };
                    }
                    return parent;
                });
            },
            addNewWidget(state, action) {
                return state.map(parent => {
                    if (parent.id == action.payload.id) {
                        return { ...parent, chartData: [ ...parent.chartData, action.payload.newData ] };
                    } else {
                        return parent;
                    }
                });
            },
            closeWidget(state, action) {
                const parentId = Math.floor(action.payload / 10);
                return state.map(cat => {
                    if (cat.id === parentId) {
                        return {
                            ...cat,
                            chartData: cat.chartData.map(c =>
                                c.id === action.payload ? { ...c, show: false } : c
                            ),
                        };
                    }
                    return cat;
                });
            }

        }
    }
);


export const { toggleShow, addNewWidget, closeWidget } = categorySlice.actions;
export default categorySlice.reducer;
