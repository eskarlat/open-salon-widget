import React from "react";
import moment from "moment";

const SelectDay = props => {
    const days = props.data.map((item, index) => {
        const itemDate = moment(item.date);

        return (
            <span
                className={
                    itemDate.isSame(props.currentDate, "day") ? "active" : null
                }
                key={index}
            >
                {itemDate.format("DD")}
            </span>
        );
    });

    return (
        <div className={props.class}>
            <span onClick={props.prevDay}>prev</span>
            {days}
            <span onClick={props.nextDay}>Next</span>
        </div>
    );
};

export default SelectDay;
