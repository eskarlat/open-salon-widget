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
            <React.Fragment>
                {this.props.selectedLocation && (
                    <ul className="widget_navigation__list">
                        <li className="widget_navigation__list-item">
                            <span class="widget_navigation__list-item-text">
                                {this.props.selectedLocation.address}
                            </span>
                            <span className="widget_navigation__list-item-close">
                                &times;
                            </span>
                        </li>

                        {this.props.selectedServices && (
                            <ul className="widget_navigation__sub-list">
                                {this.props.selectedServices.map(service => (
                                    <li
                                        key={service._id}
                                        className="widget_navigation__list-item"
                                    >
                                        <span className="widget_navigation__list-item-text">
                                            {service.title}
                                        </span>
                                        <span className="widget_navigation__list-item-close">
                                            &times;
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {this.props.selectedMaster && (
                            <li className="widget_navigation__list-item">
                                <span className="widget_navigation__list-item-text">
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
                )}
            </React.Fragment>
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
