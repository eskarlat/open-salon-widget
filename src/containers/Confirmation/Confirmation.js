import React, { Component } from "react";
import { connect } from "react-redux";

//Redux actions
import * as actions from "../../store/actions/index";

class Confirmation extends Component {
    state = {
        selectedMaster: null,
        selectedTime: null
    };

    componentWillMount() {
        const selectedMaster = this.props.selectedMaster;
        const selectedTime = this.props.selectedTime;

        this.setState({
            selectedMaster,
            selectedTime
        });

        this.props.resetData();
    }

    render() {
        return (
            <React.Fragment>
                <p>Success booking</p>
                <p>
                    {this.state.selectedMaster.firstName} was reserved by you on
                    {this.state.selectedTime.date} at
                    {this.state.selectedTime.time}
                </p>
                <strong>Waiting for you!</strong>
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
