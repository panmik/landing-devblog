import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
        <div className="footer">
            <hr/>
            <div className="d-md-flex d-block flex-row mx-md-auto justify-content-center">
                <div className="div mx-4">
                    <small>&copy; 2018 <Link to='/gamecompany'>Game Company</Link></small>
                </div>
                <div className="div mx-4">
                    <small><Link to="/contact">Contact</Link></small>
                </div>
            </div>
        </div>
    );
};