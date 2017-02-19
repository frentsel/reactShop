import React from 'react';
import {connect} from 'react-redux';

const Search = ({ store, filter }) => {
    return (
        <form className="navbar-form navbar-left">
            <div className="form-group">
                <input type="text" className="form-control" value={store.q || ''} placeholder="Search" onInput={filter} />
            </div>
        </form>
    );
};

export default connect(
    state => ({
        store: state.products
    }),
    dispatch => ({
        filter: (el) => {
            dispatch({
                type: 'FILTER',
                q: el.target.value
            });
        }
    })
)(Search);