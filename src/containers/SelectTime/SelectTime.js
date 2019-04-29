import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import "../SelectTime/SelectTime.scss";

//Components
import SelectDay from "../../components/SelectDay/SelectDay";
import Times from "../../components/Times/Times";
import List from "../../components/List/List";

//Redux actions
import * as actions from "../../store/actions/index";

class SelectTime extends Component {
    state = {
        currentDate: moment(),
        data: []
    };

    componentDidMount() {
        this.updateCalendar();
    }

    minusDayHandler = () => {
        const updateDate = this.state.currentDate;
        updateDate.subtract(1, "day");

        this.setState({
            currentDate: updateDate
        });

        this.updateCalendar(updateDate);
    };

    plusDayHandler = () => {
        const updateDate = this.state.currentDate;
        updateDate.add(1, "day");

        this.setState({
            currentDate: updateDate
        });

        this.updateCalendar(updateDate);
    };

    updateCalendar = (date = this.state.currentDate) => {
        this.props.fetchTimeAvailable({
            date: date.format("L"),
            salonId: "5cbefd540a9d662b3c917584",
            locationId: this.props.selectedLocation._id,
            masterId: this.props.selectedMaster._id
        });
    };

    timeSelectHandler = time => {
        this.props.selectTime(time);
        this.props.history.push("/booking/checkout");
    };

    render() {
        return (
            <List>
                <h2 class="widget__heading">Time available</h2>
                <div className="select-time">
                    <SelectDay
                        class="widget__calendar"
                        nextDay={this.plusDayHandler}
                        prevDay={this.minusDayHandler}
                        currentDate={this.state.currentDate}
                        data={this.props.timeAvailable}
                    />
                    <Times
                        class="widget__times"
                        currentDate={this.state.currentDate}
                        data={this.props.timeAvailable}
                        timeClicked={this.timeSelectHandler}
                    />
                </div>
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.widget.location,
        selectedMaster: state.widget.master,
        timeAvailable: state.timeAvailable.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTimeAvailable: props =>
            dispatch(actions.fetchTimeAvailable(props)),
        selectTime: services => dispatch(actions.selectTime(services))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectTime);
