import React from 'react';
import Chart from './Chart.component';
import { Add } from '@mui/icons-material';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import ProgressBar from './ProgressBar.component';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { closeWidget } from '../store/categorySlice';

const Card = ({ title, data = null, total, isButton = false, showProgress = false, id, setCatId, setOpen, text = "" }) => {

    const handleClick = () => {
        setCatId(id);
        setOpen(true);
    };

    const dispatch = useDispatch();


    if (showProgress) {
        return (
            <div
                className='p-2 bg-white rounded-lg h-full  relative '>
                <span
                    onClick={() => { dispatch(closeWidget(data.id)); }}
                    className='absolute top-2 right-2 hover:bg-gray-100 rounded-full hover:cursor-pointer p-1'
                ><CloseIcon />
                </span>

                <p
                    className='font-bold text-sm mb-2'
                >
                    {data?.title}
                </p>
                {
                    data ?
                        <ProgressBar data={data} />
                        :
                        <div
                            className='flex flex-col h-full justify-center items-center '
                        >
                            <span
                                className='text-gray-400'
                            >
                                <TrendingUpOutlinedIcon />
                            </span>
                            <span>No Graph data available!</span>
                        </div>
                }
                {
                    isButton ? "" :
                        <div className='-translate-x-15 -translate-y-22 flex flex-col gap-2 items-center '>
                            {
                                total ?
                                    <div className='flex flex-col leading-4 justify-center items-center'>
                                        <span className='font-bold'>{total}</span>
                                        <span className='text-xs'>Total</span>
                                    </div> :
                                    ""
                            }
                        </div>
                }
            </div>
        );
    }
    else if (isButton) {
        return (
            <div className='flex items-center justify-center p-2 bg-white rounded-lg h-full  text-gray-600  '>

                <button
                    onClick={handleClick}
                    className='border border-gray-400 px-2 py-1 hover:cursor-pointer rounded flex items-center gap-2 mx-30'>
                    <Add />
                    <span>Add Widget</span>
                </button>
            </div>
        );
    } else {
        return <div className='p-2 bg-white rounded-lg h-full  relative '>
            <span
                onClick={() => { dispatch(closeWidget(id)); }}
                className='absolute top-2 right-2 hover:bg-gray-100 rounded-full hover:cursor-pointer p-1'
            ><CloseIcon /></span>

            <p className='font-bold text-sm mb-2'>{title}</p>
            {
                data && data.length > 0 && typeof data != 'string' ?
                    <Chart data={data} />
                    : text ? <div className='flex flex-col h-full justify-center items-center '>{text}</div> :
                        <div className='flex flex-col h-full justify-center items-center '>
                            <span className='text-gray-400'>
                                <TrendingUpOutlinedIcon />
                            </span>
                            <span>No Graph data available!</span>

                        </div>


            }
            {
                isButton ? "" :
                    <div className='-translate-x-[70px] -translate-y-22 flex flex-col gap-2 items-center '>
                        {
                            total ?
                                <div className='flex flex-col leading-4 justify-center items-center'>
                                    <span className='font-bold'>{total}</span>
                                    <span className='text-xs'>Total</span>
                                </div> :
                                ""
                        }
                    </div>
            }
        </div>;
    }

};

export default Card;