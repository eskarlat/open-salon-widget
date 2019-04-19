import React from 'react';

import { connect } from 'react-redux';

const SelectedItems = props => {
    return (
        <ul>
            {props.selectedLocation && <li>{props.selectedLocation}</li>}
            {props.selectedServices && <ul>{props.selectedServices.map(service => <li>{service.title}</li>)}</ul>}
        </ul>
    );
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.location,
        selectedServices: state.services
    }
};

export default connect(mapStateToProps, null)(SelectedItems);