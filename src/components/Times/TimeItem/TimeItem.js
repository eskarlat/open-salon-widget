import React from "react";

const TimeItem = props => {
    const noActive = !props.item.available
        ? "widget__times--item-no-active"
        : null;

    const itemClass = ["widget__times--item", noActive].join(" ");

    return (
        <div
            onClick={() => props.clicked(props.item)}
            className={itemClass}
            disabled={!props.item.available}
        >
            {props.item.time}
        </div>
    );
};

export default TimeItem;
