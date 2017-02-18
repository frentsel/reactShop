import React from 'react';
import {connect} from 'react-redux';

const Search = React.createClass({

    render(){
        return (
            <form className="navbar-form navbar-left">
                <div className="form-group">
                    <input type="text" className="form-control" value={this.props.store.q || ''} placeholder="Search" onInput={this.props.filter.bind(this)} />
                </div>
            </form>
        );
    }
});

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