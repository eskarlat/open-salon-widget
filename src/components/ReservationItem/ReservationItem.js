import React from "react";
import moment from "moment";

const ReservationItem = props => {
    return (
        <div className="widget-profile__history--item">
            <div className="widget-profile__history--item--title">
                Reservation by {moment(props.reservation.start).format("LL")}
            </div>
            <div className="widget-profile__history--item--master">
                {props.reservation.master.firstName}
            </div>
            <button
                className="btn btn--primary"
                onClick={event => props.clicked(event, props.reservation)}
            >
                Details
            </button>
        </div>
    );
};

export default ReservationItem;
