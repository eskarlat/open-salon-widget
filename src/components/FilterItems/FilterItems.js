import React, { Component } from "react";

import "./FilterItems.scss";

import magnifyingGlass from "../../assets/SVG/magnifying-glass.svg";

class FilterItems extends Component {
    state = {
        filterString: ""
    };

    filterHandler = event => {
        this.setState({
            filterString: event.target.value
        });

        this.props.onFilter(event.target.value);
    };

    render() {
        return (
            <div className="widget__filter">
                <input
                    type="search"
                    placeholder="Type to search"
                    onChange={this.filterHandler}
                    className="widget__filter--input"
                />
                <img
                    src={magnifyingGlass}
                    alt="search"
                    className="widget__filter--icon"
                />
            </div>
        );
    }
}

export default FilterItems;
