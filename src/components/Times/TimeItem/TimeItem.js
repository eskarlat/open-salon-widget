import React from "react";

const TimeItem = props => {
    return (
        <button
            onClick={() => props.clicked(props.item)}
            className={!props.item.available ? "inactive" : null}
            disabled={!props.item.available}
        >
            {props.item.time}
        </button>
    );
};

export default TimeItem;
