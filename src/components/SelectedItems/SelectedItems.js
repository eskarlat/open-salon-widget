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
            <ul className="widget_navigation__list">
                {this.props.selectedLocation && (
                    <li className="widget_navigation__list-item">
                        <span class="widget_navigation__list-item-text">
                            {this.props.selectedLocation.address}
                        </span>
                        <span className="widget_navigation__list-item-close">
                            &times;
                        </span>
                    </li>
                )}
                {this.props.selectedServices && (
                    <ul className="widget_navigation__list-item">
                        {this.props.selectedServices.map(service => (
                            <li key={service._id}>{service.title}</li>
                        ))}
                    </ul>
                )}
                {this.props.selectedMaster && (
                    <li className="widget_navigation__list-item">
                        <span class="widget_navigation__list-item-text">
                            {this.props.selectedMaster.firstName}
                        </span>
                        <span className="widget_navigation__list-item-close">
                            &times;
                        </span>
                    </li>
                )}
                {this.props.selectedTime && (
                    <li className="widget_navigation__list-item">
                        <span className="widget_navigation__list-item-text">
                            {this.props.selectedTime.time}
                        </span>
                        <span className="widget_navigation__list-item-close">
                            &times;
                        </span>
                    </li>
                )}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.widget.location,
        selectedServices: state.widget.services,
        selectedMaster: state.widget.master,
        selectedTime: state.widget.time
    };
};

export default connect(
    mapStateToProps,
    null
)(SelectedItems);
