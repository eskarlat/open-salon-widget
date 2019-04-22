import React from "react";
import "./LocationItem.scss";

const LocationItem = props => {
    return (
        <div
            className="location-item"
            onClick={() => props.clicked(props.location)}
        >
            <span>{props.location.address}</span>/
            <span>{props.location.workTimeStart}</span>/
            <span>{props.location.workTimeEnd}</span>
        </div>
    );
};

export default LocationItem;
