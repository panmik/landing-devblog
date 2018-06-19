import React from 'react';
import {Redirect} from 'react-router-dom';

const Home = (props) => {
    return (
        <div className='text-body'>
            <p>
                This site is a work in progress landing page and devblog for an unannounced game. If you'd like to use it, you can fork it over at <a href = 'https://github.com/panmik/landing-devblog.git' target="_blank">https://github.com/panmik/landing-devblog.git</a>.
            </p>
        </div>
    );
};


export default Home;