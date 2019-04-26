import React from "react";
import moment from "moment";

const SelectDay = props => {
    const days = props.data.map((item, index) => {
        const itemDate = moment(item.date);

        const active = itemDate.isSame(props.currentDate, "day")
            ? "widget__calendar--day-active"
            : null;

        const itemClass = ["widget__calendar--day", active].join(" ");

        return (
            <div className={itemClass} key={index}>
                {itemDate.format("DD")}
            </div>
        );
    });

    return (
        <div className={props.class}>
            <div class="widget__calendar--arrow" onClick={props.prevDay}>
                &lang;
            </div>
            {days}
            <div class="widget__calendar--arrow" onClick={props.nextDay}>
                &rang;
            </div>
        </div>
    );
};

export default SelectDay;
