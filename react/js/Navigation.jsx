import React from 'react';

const Navigation = React.createClass({

    render: function () {
        return (
            <ul className="nav navbar-nav">
                <li><a href="#/delivery">Delivery</a></li>
                <li><a href="#/contact">Contact</a></li>
            </ul>
        );
    }
});

export default Navigation;