import React from "react";
import moment from "moment";
import TimeItem from "./TimeItem/TimeItem";

const Times = props => {
    const times = props.data.map(item => {
        if (moment(item.date).isSame(props.currentDate, "day")) {
            return item.times.map((timeItem, index) => (
                <TimeItem
                    key={index}
                    item={timeItem}
                    clicked={props.timeClicked}
                />
            ));
        }
    });

    return <div className={props.class}>{times}</div>;
};

export default Times;
