import React from "react";
import "./MasterItem.scss";

const MasterItem = props => {
    return (
        <div
            className="master-item"
            onClick={() => props.clicked(props.master)}
        >
            <span>{props.master.firstName}</span>/
            <span>{props.master.lastName}</span>/
            <span>{props.master.title}</span>
            <span>{props.master.instagram}</span>
        </div>
    );
};

export default MasterItem;
