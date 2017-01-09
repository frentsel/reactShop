import React from 'react';

class Sort extends React.Component {

    // constructor (props) {
    //
    //     super(props);
    //
    //     this.rules = props.rules;
    //     this.state = {sort: null};
    //
    //     this.sortHandle = this.sortHandle.bind(this);
    // }

    sortHandle(e){
        this.setState({
            sort: e.target.value
        });
        // this.props.updateSort(e);
    }

    render(){

        return (
            <div className="sortBy pull-right">
                <div className="pull-left">Sort by:&nbsp;</div>
                <div className="pull-left">
                    <select>
                        <option key="1" value="name">Alphabetical</option>
                        <option key="2" value="age">Newest</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Sort;