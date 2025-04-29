
import React, { useState } from 'react';
import Card from '../components/Card.component';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MUIDrawer } from '../components/MUIDrawer.component';
import { useDispatch, useSelector } from 'react-redux';
import { MUIModal } from '../components/MUIModal.component';

const Dashboard = () => {
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
    const [ open, setOpen ] = useState(false);
    // for modal
    const [ catId, setCatId ] = useState(1);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category);
    const searchQuery = useSelector((state) => state.search).toLowerCase();

    const filteredCategories = categories
        .map((cat) => {
            const matchedWidgets = cat.chartData.filter(widget => {
                return widget.title?.toLowerCase().includes(searchQuery);
            });

            if (cat.category.toLowerCase().includes(searchQuery) || matchedWidgets.length) {
                return {
                    ...cat,
                    chartData: matchedWidgets.length ? matchedWidgets : cat.chartData
                };
            }

            return null;
        })
        .filter(Boolean); // Remove nulls

    return (
        <React.Fragment>

            <div className='m-6'>
                <div className='flex justify-between'>
                    <p className='font-bold text-xl' >CNAPP Dashboard</p>
                    <div className='flex gap-3 text-sm '>
                        <button onClick={() => setIsDrawerOpen(true)} className='flex items-center border-gray-400 hover:cursor-pointer bg-white gap-1 border-1 py-1 px-2 rounded text-gray-600'>
                            <span>Add Widget</span>
                            <span><AddIcon /></span>
                        </button>
                        <button className='bg-white p-1 border-1 hover:cursor-pointer border-gray-400 rounded text-gray-600'><AutorenewIcon /></button>
                        <button className='bg-white p-1 border-1 hover:cursor-pointer border-gray-400 rounded text-gray-600'><MoreVertIcon /></button>
                        <div className='border-2 bg-white p-1 rounded border-icon-blue flex items-center text-indigo-800 font-semibold'>
                            <span className='px-1 border-e-2 border-icon-blue'><AccessAlarmIcon /></span>
                            <select className='px-1 '>
                                <option default value="2">Last 2 days</option>
                                <option value="3">Last 3 days</option>
                                <option value="4">Last 4 days</option>
                            </select>
                        </div>
                    </div>
                </div>
                {searchQuery != "" && filteredCategories.length ? (
                    filteredCategories.map((cat, index) => (
                        <div key={index} className='mx-2 mb-2'>
                            <p className='pt-2 font-bold'>{cat.category}</p>
                            <div className='py-2 grid grid-cols-3 gap-4'>
                                {cat.chartData.map((cspm, i) => {
                                    let total = 0;

                                    if (cat.category === "CSPM Executive Dashboard") {
                                        total = cspm.data.reduce((sum, curObj) => sum + curObj.value, 0);
                                    }
                                    if (!cspm.show) {
                                        return null;
                                    }
                                    return (
                                        <div key={i} className='w-120 h-60'>
                                            <Card
                                                data={cat.category === "CSPM Executive Dashboard" ? cspm.data : cat.category === "Registry Scan" ? cspm : null}
                                                title={cspm.title}
                                                text={cspm.data}
                                                showProgress={cat.category === "Registry Scan"}
                                                total={cat.category === "CSPM Executive Dashboard" ? total : null}
                                            />
                                        </div>
                                    );
                                })}
                                {/* <div className='w-120 h-60'>
                                    <Card isButton={true} />
                                </div> */}
                            </div>
                        </div>
                    ))
                ) : (

                    <div>
                        {
                            searchQuery != "" &&
                            <p className='text-center text-gray-500 mt-10'>No results found.</p>
                        }
                    </div>

                )}
                {
                    categories && categories.length &&
                    categories.map((cat, index) => (
                        <div key={index} className='mx-2 mb-2'>
                            <p className='pt-2 font-bold'>{cat.category}</p>
                            <div className=' py-2  grid grid-cols-3 gap-4 '>

                                {
                                    cat.chartData.map((cspm, i) => {
                                        let total = 0;
                                        if (cat.category == "CSPM Executive Dashboard") {
                                            total = cspm.data.reduce((sum, curObj) => sum + curObj.value, 0);
                                        }
                                        if (!cspm.show) {
                                            return null;
                                        }
                                        return (


                                            <div key={i} className='w-120 h-60'>
                                                <Card
                                                    data={cat.category == "CSPM Executive Dashboard" ? cspm.data : cat.category == "Registry Scan" ? cspm : cat.category == "CWPP Dashboard" ? cspm.data : null}
                                                    title={cspm.title}
                                                    id={cspm.id}
                                                    text={typeof cspm.data === 'string' ? cspm.data : null}
                                                    showProgress={cat.category == "Registry Scan" ? true : false}
                                                    total={cat.category == "CSPM Executive Dashboard" ? total : null}
                                                />
                                            </div>


                                        );
                                    })
                                }
                                <div className='w-120 h-60'>
                                    <Card isButton={true} id={cat.id} setCatId={setCatId} setOpen={setOpen} />
                                </div>

                            </div >
                        </div>
                    ))
                }


            </div >

            <MUIDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            <MUIModal open={open} setOpen={setOpen} catId={catId} />
        </React.Fragment >
    );
};

export default Dashboard;




{/* <div className='mx-2 mb-2'>
                    <p className='pt-2 font-bold'>CSPM Executive Dashboard</p>
                    <div className=' py-2  grid grid-cols-3 gap-4 '>

                        {
                            CSPM.map((cspm, i) => {
                                const total = cspm.data.reduce((sum, curObj) => sum + curObj.value, 0);
                                return (
                                    <div key={i} className='w-120 h-60'>
                                        <Card data={cspm.data} title={cspm.title} total={total} />
                                    </div>
                                );
                            })
                        }
                        <div className='w-120 h-60'>
                            <Card isButton={true} />
                        </div>

                    </div >
                </div>
                <div className='mx-2 mb-2'>
                    <p className='pt-2 font-bold'>CWPP Dashboard</p>
                    <div className=' py-2  grid grid-cols-3 gap-4 '>
                        {
                            CWPP.map((item, index) => (
                                <div key={index} className='w-120 h-60'>
                                    <Card title={item.title} />
                                </div>
                            ))
                        }
                        <div className='w-120 h-60'>
                            <Card isButton={true} />
                        </div>

                    </div >
                </div>
                <div className='mx-2 mb-2'>
                    <p className='pt-2 font-bold'>Registry Scan</p>
                    <div className=' py-2  grid grid-cols-3 gap-4 '>
                        {
                            registryScan.map(rs => (
                                <div key={rs.title} className='w-120 h-60'>
                                    <Card data={rs} showProgress={true} />
                                </div>

                            ))
                        }
                        <div className='w-120 h-60'>
                            <Card isButton={true} />
                        </div>

                    </div >
                </div> */}