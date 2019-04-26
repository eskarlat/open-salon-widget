import React from "react";
import "./LocationItem.scss";

import Mark from "../../assets/SVG/location.svg";

const LocationItem = props => {
    return (
        <figure
            className="widget__item location-item"
            onClick={() => props.clicked(props.location)}
        >
            <div className="location-item__map">
                <img
                    className="location-item__icon"
                    src={Mark}
                    alt={props.location.address}
                />
            </div>
            <figcaption className="location-item__info">
                <div className="location-item__info-title">
                    {props.location.address}
                </div>
                <div className="location-item__info-work-time">
                    {props.location.open} - {props.location.close}
                </div>
            </figcaption>
        </figure>
    );
};

export default LocationItem;
