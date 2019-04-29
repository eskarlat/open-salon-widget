import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

//Redux actions
import * as actions from "../../store/actions/index";

//Components
import List from "../../components/List/List";
import SuccessCheckMark from "../../components/UI/SuccessCheckMark/SuccessCheckMark";

//Scss
import "./Confirmation.scss";

class Confirmation extends Component {
    state = {
        selectedMaster: null,
        selectedTime: null
    };

    componentWillMount() {
        const selectedMaster = this.props.selectedMaster;
        const selectedTime = this.props.selectedTime;

        if (!selectedMaster && !selectedTime) {
            this.props.history.replace("/booking/location");
        }

        this.setState({
            selectedMaster,
            selectedTime
        });

        this.props.resetData();
    }

    selectedDate = () => {
        return moment(this.state.selectedTime.date).format("LL");
    };

    profileBtnHandler = () => {
        this.props.history.replace("/profile");
    };

    render() {
        return (
            <React.Fragment>
                <List>
                    <div className="widget__confirmation">
                        <div className="widget__confirmation--box">
                            <div className="widget__confirmation--checkmark">
                                <SuccessCheckMark />
                            </div>
                            <h1 className="heading-secondary">
                                Success booking
                            </h1>
                            <figure className="widget__confirmation--master">
                                <img
                                    src={this.state.selectedMaster.avatar}
                                    alt={this.state.selectedMaster.firstName}
                                    className="widget__confirmation--master--photo"
                                />
                                <figcaption className="widget__confirmation--master--info">
                                    <span className="widget__confirmation--master--name">
                                        {this.state.selectedMaster.firstName}
                                    </span>
                                    <span className="widget__confirmation--text">
                                        was reserved on {this.selectedDate()} at{" "}
                                        {this.state.selectedTime.time}
                                    </span>
                                </figcaption>
                            </figure>
                            <button
                                onClick={this.profileBtnHandler}
                                className="btn btn--primary"
                            >
                                Go to profile
                            </button>
                        </div>
                    </div>
                </List>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedMaster: state.widget.master,
        selectedTime: state.widget.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetData: () => dispatch(actions.resetData())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Confirmation);
