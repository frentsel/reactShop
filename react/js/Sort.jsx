import React from 'react';

const Sort = React.createClass({

    getInitialState: function(){
        return {
            sort: name
        }
    },

    sortHandle: function(e){

        const event = new Event('productsSorting');
        event.key = e.target.value;
        document.dispatchEvent(event);

        this.setState({
            sort: e.target.value
        });
    },

    render: function(){

        return (
            <div className="sortBy pull-right">
                <div className="pull-left">Sort by:&nbsp;</div>
                <div className="pull-left">
                    <select onChange={this.sortHandle}>
                        <option key="1" value="name">Alphabetical</option>
                        <option key="2" value="age">Newest</option>
                    </select>
                </div>
            </div>
        )
    }
});

export default Sort;