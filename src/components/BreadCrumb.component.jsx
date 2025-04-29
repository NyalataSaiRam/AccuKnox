import React from 'react';
import { Link, useLocation, } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BreadCrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);



    return (
        <nav>
            <ul className='flex m-2  gap-x-2 items-center'>
                {
                    pathnames.length > 0 ? <Link
                        to={'/'}
                        className={`${pathnames.length > 0 ? 'font-semibold text-gray-400 capitalize' : 'font-semibold text-indigo-800 capitalize'}`}
                    >
                        home
                    </Link> :
                        <li
                            className={`${pathnames.length > 0 ? 'font-semibold text-gray-400 capitalize' : 'font-semibold text-indigo-800 capitalize'}`}
                        >
                            home
                        </li>
                }
                {
                    pathnames.map((name, index) => {
                        const isLast = pathnames.length === index + 1;
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                        if (isLast) {
                            return (

                                <li
                                    key={name}
                                    className='font-semibold text-indigo-800 capitalize' >
                                    <span
                                        className='text-sm text-gray-400' >
                                        <ChevronRightIcon
                                            fontSize='small'
                                        />
                                    </span>  {name}</li>

                            );
                        }
                        return (

                            <li
                                key={name}
                                className='font-semibold text-gray-400 capitalize'
                            >
                                <ChevronRightIcon />  {name}
                            </li>
                        );
                    })

                }

            </ul >
        </nav >
    );

};

export default BreadCrumb;