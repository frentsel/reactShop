import React from 'react';
import { Link } from 'react-router';

const Navigation = function () {
    return (
        <ul className="nav navbar-nav">
            <li><Link to={'/delivery'}>Delivery</Link></li>
            <li><Link to={'/contact'}>Contact</Link></li>
        </ul>
    );
};

export default Navigation;