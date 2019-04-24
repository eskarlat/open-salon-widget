import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import "../SelectTime/SelectTime.scss";

//Redux actions
import * as actions from "../../store/actions/index";

let test = [];

const salon = {
    id: 1,
    locations: [
        {
            id: 1,
            address: "Sofia, Tenef 12",
            open: "10:00",
            close: "17:00",
            reservationTimePeriod: "15"
        },
        {
            id: 2,
            address: "Sofia, Tenef 145",
            open: "10:00",
            close: "17:00",
            reservationTimePeriod: "15"
        },
        {
            id: 3,
            address: "Plovdiv, FYT 212",
            open: "10:00",
            close: "16:00",
            reservationTimePeriod: "15"
        }
    ],
    services: [
        { id: 1, title: "men hearcut", duration: 60, cost: 120 },
        {
            id: 2,
            title: "men hearcut with beard",
            duration: 60,
            cost: 320
        },
        { id: 3, title: "men hearcut with son", duration: 180, cost: 520 },
        { id: 4, title: "make less beard", duration: 30, cost: 80 }
    ],
    masters: [
        {
            id: 1,
            firstName: "Anton",
            lastName: "Glamozda",
            title: "barber",
            instagram: "test"
        },
        {
            id: 2,
            firstName: "Andrej",
            lastName: "Kara",
            title: "barber",
            instagram: "test"
        },
        {
            id: 3,
            firstName: "Kiril",
            lastName: "Kirilov",
            title: "barber",
            instagram: "test"
        }
    ],
    reservations: [
        {
            id: 1,
            salon_id: 1,
            location_id: 1,
            client_id: 1,
            master_id: 1,
            services: [1, 2],
            start: "2019-04-22 16:00",
            end: "2019-04-22 18:00",
            created_at: "2019-04-22 12:10"
        },
        {
            id: 2,
            salon_id: 1,
            location_id: 1,
            client_id: 2,
            master_id: 1,
            services: [1, 2],
            start: "2019-04-22 12:00",
            end: "2019-04-22 13:00",
            created_at: "2019-04-22 11:10"
        },
        {
            id: 3,
            salon_id: 1,
            location_id: 1,
            client_id: 2,
            master_id: 1,
            services: [1, 2],
            start: "2019-04-23 12:00",
            end: "2019-04-23 13:00",
            created_at: "2019-04-22 11:10"
        }
    ]
};

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
            date: this.state.currentDate,
            salonId: "5cbefd540a9d662b3c917584",
            locationId: "5cbefd95e312f01948eb81c2",
            masterId: "5cbefee491f24e2394132997"
        });
    };

    timeSelectHandler = time => {
        this.props.selectTime(time);
    };

    render() {
        return (
            <div className="select-time">
                <div className="select-time__header">
                    <span onClick={this.minusDayHandler}>prev</span>
                    <div>
                        {this.props.timeAvailable.map((item, index) => (
                            <span
                                className={
                                    moment(item.date).isSame(
                                        this.state.currentDate,
                                        "day"
                                    )
                                        ? "active"
                                        : null
                                }
                                key={index}
                            >
                                {moment(item.date).format("DD")}
                            </span>
                        ))}
                    </div>
                    <span onClick={this.plusDayHandler}>Next</span>
                </div>
                <div className="select-time__times">
                    {this.props.timeAvailable.map(item => {
                        if (
                            moment(item.date).isSame(
                                this.state.currentDate,
                                "day"
                            )
                        ) {
                            return item.times.map((timeItem, index) => (
                                <span
                                    onClick={() =>
                                        this.timeSelectHandler(timeItem.time)
                                    }
                                    key={index}
                                    className={
                                        !timeItem.available ? "inactive" : null
                                    }
                                >
                                    {timeItem.time}
                                </span>
                            ));
                        }
                    })}
                </div>
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
