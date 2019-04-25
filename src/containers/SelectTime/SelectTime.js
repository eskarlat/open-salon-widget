import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import "../SelectTime/SelectTime.scss";

//Components
import SelectDay from "../../components/SelectDay/SelectDay";
import Times from "../../components/Times/Times";

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
        this.setState(prevState => ({
            currentDate: prevState.currentDate.subtract(1, "day")
        }));
        this.updateCalendar();
    };

    plusDayHandler = () => {
        this.setState(prevState => ({
            currentDate: prevState.currentDate.add(1, "day")
        }));
        this.updateCalendar();
    };

    updateCalendar = () => {
        this.props.fetchTimeAvailable({
            date: this.state.currentDate.format("L"),
            salonId: "5cbefd540a9d662b3c917584",
            locationId: "5cbefd95e312f01948eb81c2",
            masterId: "5cbefee491f24e2394132997"
        });
    };

    timeSelectHandler = time => {
        this.props.selectTime(time);
        this.props.history.push("/booking/checkout");
    };

    render() {
        return (
            <div className="select-time">
                <SelectDay
                    class="select-time__header"
                    nextDay={this.plusDayHandler}
                    prevDay={this.minusDayHandler}
                    currentDate={this.state.currentDate}
                    data={this.props.timeAvailable}
                />
                <Times
                    class="select-time__times"
                    currentDate={this.state.currentDate}
                    data={this.props.timeAvailable}
                    timeClicked={this.timeSelectHandler}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.location,
        selectedMaster: state.master,
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
