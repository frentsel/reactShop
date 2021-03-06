import React from 'react';
import {connect} from 'react-redux';

const Sort = ({ sort }) => {
    return (
        <div className="sortBy pull-right">
            <div className="pull-left">Sort by:&nbsp;</div>
            <div className="pull-left">
                <select onChange={sort}>
                    <option key="2" checked value="age">Newest</option>
                    <option key="1" value="name">Alphabetical</option>
                </select>
            </div>
        </div>
    )
};

export default connect(
    state => ({
        store: state.products
    }),
    dispatch => ({
        sort: (el) => {
            dispatch({
                type: 'SORT',
                key: el.target.value
            });
        }
    })
)(Sort);