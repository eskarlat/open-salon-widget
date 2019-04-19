import React, { Component } from 'react';

class FilterItems extends Component {

    state = {
        filterString: ''
    }

    filterHandler = event => {
        this.setState({
            filterString: event.target.value
        });

        this.props.onFilter(event.target.value);
    };

    render() {
        return (
            <input type="search" placeholder="Type to search" onChange={this.filterHandler} />
        )
    }
}

export default FilterItems;