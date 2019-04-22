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
        const date = this.state.currentDate.clone().subtract(3, "days");
        const location = this.props.selectedLocation;
        const master = this.props.selectedMaster;

        while (date <= this.state.currentDate.clone().add(3, "days")) {
            const [openHour, openMinutes] = location.open.split(":");
            const [closeHour, closeMinutes] = location.close.split(":");

            let salonTime = date.clone();
            salonTime.set("hour", openHour);
            salonTime.set("minute", openMinutes);

            const salonClose = date.clone();
            salonClose.set("hour", closeHour);
            salonClose.set("minute", closeMinutes);

            const timeAvailable = [];

            while (salonTime <= salonClose) {
                let available = true;

                salon.reservations.map(reservation => {
                    if (
                        salonTime.isBetween(
                            reservation.start,
                            reservation.end,
                            null,
                            "[]"
                        )
                    ) {
                        available = false;
                    }
                });

                timeAvailable.push({
                    time: salonTime.format("HH:mm"),
                    available: available
                });

                salonTime.add(location.reservationTimePeriod, "minutes");
            }

            test.push({
                date: date.clone(),
                times: timeAvailable
            });

            date.add(1, "days");
        }

        this.setState({ data: test });
    }

    minusDayHandler = () => {
        this.setState(prevState => ({
            currentDate: prevState.currentDate.subtract(1, "day")
        }));
    };

    plusDayHandler = () => {
        this.setState(prevState => ({
            currentDate: prevState.currentDate.add(1, "day")
        }));
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
                        {this.state.data.map((item, index) => (
                            <span
                                className={
                                    item.date.isSame(
                                        this.state.currentDate,
                                        "day"
                                    )
                                        ? "active"
                                        : null
                                }
                                key={index}
                            >
                                {item.date.format("DD")}
                            </span>
                        ))}
                    </div>
                    <span onClick={this.plusDayHandler}>Next</span>
                </div>
                <div className="select-time__times">
                    {this.state.data.map(item => {
                        if (item.date.isSame(this.state.currentDate, "day")) {
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
        selectedMaster: state.master
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectTime: services => dispatch(actions.selectTime(services))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectTime);
