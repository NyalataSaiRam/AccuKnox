import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <span>Go to </span>
            <Link className='hover:text-blue-400 hover:underline text-blue-600 underline' to={'/dashboard'}>Dashboard</Link>
        </div>
    );
};

export default Home;