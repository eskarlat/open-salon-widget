import React, { Component } from "react";

import { connect } from "react-redux";

class SelectedItems extends Component {
    componentWillUpdate() {
        console.log("[update]");
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return (
            <ul>
                {this.props.selectedLocation && (
                    <li>{this.props.selectedLocation.address}</li>
                )}
                {this.props.selectedServices && (
                    <ul>
                        {this.props.selectedServices.map(service => (
                            <li key={service.id}>{service.title}</li>
                        ))}
                    </ul>
                )}
                {this.props.selectedMaster && (
                    <li>{this.props.selectedMaster.firstName}</li>
                )}
                {this.props.selectedTime && <li>{this.props.selectedTime}</li>}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.location,
        selectedServices: state.services,
        selectedMaster: state.master,
        selectedTime: state.time
    };
};

export default connect(
    mapStateToProps,
    null
)(SelectedItems);
