import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

//Components
import List from "../../components/List/List";
import LocationItem from "./LocationItem/LocationItem";
import FilterItems from "../../components/FilterItems/FilterItems";

//Redux actions
import * as actions from "../../store/actions/index";

class Location extends Component {
    state = {
        locations: [
            {
                id: 1,
                address: "Sofia, Tenef 12",
                open: "10:00",
                close: "17:00",
                reservationTimePeriod: "15"
            },
            {
                id: 2,
                address: "Sofia, Tenef 145",
                open: "10:00",
                close: "17:00",
                reservationTimePeriod: "15"
            },
            {
                id: 3,
                address: "Plovdiv, FYT 212",
                open: "10:00",
                close: "17:00",
                reservationTimePeriod: "15"
            }
        ],
        filteredItems: []
    };

    filterHandler = filterString => {
        let filteredItems = this.state.locations;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const address = item.address.toLowerCase();
            return address.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    locationHandler = location => {
        this.props.selectLocation(location);
        this.props.history.replace("/booking/services");
    };

    render() {
        let locations = null;

        if (this.state.filteredItems.length > 0) {
            locations = this.state.filteredItems;
        } else {
            locations = this.state.locations;
        }

        return (
            <List>
                <FilterItems onFilter={this.filterHandler} />
                {locations.map(location => (
                    <LocationItem
                        key={location.id}
                        location={location}
                        clicked={this.locationHandler}
                    />
                ))}
            </List>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectLocation: location => dispatch(actions.selectLocation(location))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Location);
