import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

class Search extends React.Component {

    constructor (props) {
        super(props);
        this.props = props;
        this.state = {search: ''};

        this.searchHandle = this.searchHandle.bind(this);
    }

    searchHandle(e){

        this.setState({
            search: e.target.value.toLowerCase()
        });

        const event = new Event('productsFiltering');
        event.key = e.target.value.toLowerCase();
        document.dispatchEvent(event);
    }

    render(){
        return (
            <form className="navbar-form navbar-left">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" value={this.state.search} onInput={this.searchHandle} />
                </div>
            </form>
        );
    }
}

export default Search;