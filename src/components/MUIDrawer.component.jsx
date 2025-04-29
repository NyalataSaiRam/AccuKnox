import React, { useEffect, useState } from 'react';
import { Box, Drawer, Tab, Tabs } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShow } from '../store/categorySlice';

export let initialCatsList = [];

export const MUIDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
    const [ selectedTab, setSelectedTab ] = useState(1);
    const [ tabList, setTabList ] = useState([]);
    const [ listOfChanges, setListOfChanges ] = useState(new Set());
    const categories = useSelector(state => state.category);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const configTabList = () => {
        const selectedCategory = categories.find(c => c.id === selectedTab);
        if (selectedCategory) {
            setTabList(selectedCategory.chartData.map(c => ({
                id: c.id,
                title: c.title,
                show: c.show
            })));
        }
    };

    const checkBoxChange = (id) => {
        setTabList(prev => prev.map(item =>
            item.id === id ? { ...item, show: !item.show } : item
        ));
        setListOfChanges(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const confirmChanges = () => {
        dispatch(toggleShow([ ...listOfChanges ]));
        setListOfChanges(new Set());
        setIsDrawerOpen(false);
    };

    const cancelChanges = () => {
        setTabList(prev => prev.map(item =>
            listOfChanges.has(item.id)
                ? { ...item, show: !item.show }
                : { ...item }
        ));
        setListOfChanges(new Set());
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        configTabList();
    }, [ categories, selectedTab ]);

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <div className="flex justify-between items-center p-4 bg-black text-white w-[600px]">
                <span>Add Widget</span>
                <span onClick={() => setIsDrawerOpen(false)}>
                    <CloseIcon />
                </span>
            </div>
            <p className="px-4 py-2">
                Personalize your dashboard by adding the following widget
            </p>
            <Box padding="0 16px" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab value={1} label="CSPM" />
                    <Tab value={2} label="CWPP" />
                    <Tab value={3} label="Image" />
                </Tabs>
            </Box>
            <div className="m-4">
                {tabList.map(cat => (
                    <div
                        key={cat.id}
                        className="flex items-center gap-4 p-2 my-2 mx-6 rounded border border-gray-400"
                    >
                        <input
                            onChange={() => checkBoxChange(cat.id)}
                            id={cat.id}
                            type="checkbox"
                            checked={cat.show}
                        />
                        <label htmlFor={cat.id}>{cat.title}</label>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-end gap-2 px-10 py-4 absolute bottom-0 right-0">
                <button
                    onClick={cancelChanges}
                    className="py-1 px-4 w-30 rounded border text-center hover:cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={confirmChanges}
                    className="py-1 px-4 w-30 rounded border text-center hover:cursor-pointer text-white bg-black"
                >
                    Confirm
                </button>
            </div>
        </Drawer>
    );
};
