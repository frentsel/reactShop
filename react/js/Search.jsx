import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

const Search = React.createClass({

    getInitialState() {
        return {search: ''};
    },
    searchHandle: function(e){

        this.setState({
            search: e.target.value.toLowerCase()
        });

        const event = new Event('productsFiltering');
        event.key = e.target.value.toLowerCase();
        document.dispatchEvent(event);
    },
    render: function(){
        return (
            <form className="navbar-form navbar-left">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" value={this.state.search} onInput={this.searchHandle} />
                </div>
            </form>
        );
    }
});

export default Search;