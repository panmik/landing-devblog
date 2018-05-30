import React from 'react';
import {Link, NavLink} from 'react-router-dom';
/*
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler"
                aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav mt-lg-0">
                        <li className="nav-item mx-2">
                            <NavLink className="nav-link" exact to="/">HOME</NavLink>
                        </li>
                        <li className="nav-item mx-2">
                            <NavLink className="nav-link" to="/devblog">BLOG</NavLink>
                        </li>
                        <li className="nav-item mx-2">
                            <NavLink className="nav-link" to="/presskit">PRESSKIT</NavLink>
                        </li>
                    </ul>
                </div>
            */
export default (props) => {
    return (
        <nav className="navbar navbar-expand mx-0">
            <div class="d-md-flex d-block flex-row mx-md-auto">
                    <ul className="navbar-nav mt-lg-0">
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link" exact to="/">HOME</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link" to="/devblog">BLOG</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link" to="/presskit">PRESSKIT</NavLink>
                        </li>
                    </ul>
                </div>
        </nav>
    );
};