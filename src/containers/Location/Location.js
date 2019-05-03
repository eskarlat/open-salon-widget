import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

//Components
import List from "../../components/List/List";
import LocationItem from "../../components/LocationItem/LocationItem";
import FilterItems from "../../components/FilterItems/FilterItems";

//Redux actions
import * as actions from "../../store/actions/index";

class Location extends Component {
    state = {
        filteredItems: []
    };

    componentDidMount() {
        this.props.fetchLocations(this.props.salon._id);
        this.props.resetData();
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
        this.props.history.push("/booking/services");
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
                <h2 className="widget__heading">Locations</h2>
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
        locations: state.loc.locations,
        isLoading: state.widget.isLoading,
        salon: state.sal.salon
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLocations: salonId => dispatch(actions.fetchLocations(salonId)),
        selectLocation: location => dispatch(actions.selectLocation(location)),
        resetData: () => dispatch(actions.resetData())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Location);
