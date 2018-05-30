import React from 'react';
import {lorem, lorem2, lorem3} from '../Utilities/utilities.js'

const Home = (props) => {
    return (
        <div className='text-body'>
            <p>
                {lorem2}
            </p>

            <p>
                {lorem}
            </p>

            <p>
                {lorem3}
            </p>
        </div>
    );
};

export default Home;