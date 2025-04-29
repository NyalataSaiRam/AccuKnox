import React from 'react';
import BreadCrumb from '../components/BreadCrumb.component';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';

const Layout = () => {
    const dispatch = useDispatch();


    const handleSearchChange = (e) => {

        dispatch(setSearchQuery(e.target.value));
    };
    return (
        <div className=''>
            <nav className='bg-white px-4'>
                <ul className='flex items-center justify-between'>
                    <li>
                        <BreadCrumb />
                    </li>
                    <ul className='flex flex-1 items-center justify-end gap-6'>

                        <li className='relative text-icon-blue' >
                            <span className='absolute top-1 left-2'>
                                <SearchIcon />
                            </span>
                            <input
                                type="text"
                                onChange={handleSearchChange}
                                className='border-1 p-1 rounded border-gray-400 outline-none placeholder:text-gray-400 placeholder:font-semibold w-[450px] px-9 bg-my-blue'
                                placeholder='Search anything...'
                            />
                        </li>
                        <li>
                            <select className='w-[200px] border-1 border-gray-400 p-1 rounded' >
                                <option value="value-1">Value1</option>
                                <option value="value-2">Value2</option>
                                <option value="value-3">Value3</option>
                            </select>
                        </li>
                        <li className='text-icon-blue'>
                            <NotificationsActiveOutlinedIcon className='hover:cursor-pointer' />
                        </li>
                        <li className='hover:cursor-pointer text-icon-blue'>
                            <AccountCircleTwoToneIcon />
                            <span className='mx-2 capitalize font-semibold text-gray-500'>username</span>
                        </li>
                    </ul>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;