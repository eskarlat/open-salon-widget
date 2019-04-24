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
        filteredItems: []
    };

    componentDidMount() {
        this.props.fetchLocations();
    }

    filterHandler = filterString => {
        let filteredItems = this.props.locations;
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
            locations = this.props.locations;
        }

        return (
            <List>
                <FilterItems onFilter={this.filterHandler} />
                {locations.map(location => (
                    <LocationItem
                        key={location._id}
                        location={location}
                        clicked={this.locationHandler}
                    />
                ))}
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        locations: state.loc.locations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLocations: salonId => dispatch(actions.fetchLocations(salonId)),
        selectLocation: location => dispatch(actions.selectLocation(location))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Location);
