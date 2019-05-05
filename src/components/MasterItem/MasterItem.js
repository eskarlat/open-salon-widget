import React from "react";
import "./MasterItem.scss";

import Instagram from "../../assets/SVG/instagram-with-circle.svg";

const MasterItem = props => {
    const style = {
        "background-image": `url(${props.master.avatar})`
    };

    return (
        <figure
            className="widget__item master-item"
            onClick={() => props.clicked(props.master)}
        >
            <div className="master-item__user-image">
                <div style={style} className="master-item__photo" />
                <div className="master-item__user-image-instagram">
                    <img
                        className="master-item__icon"
                        src={Instagram}
                        alt={props.master.firstName}
                    />
                </div>
            </div>
            <figcaption className="master-item__info">
                <div className="master-item__info-name">
                    {props.master.firstName}
                </div>
                <div className="master-item__info-job">
                    {props.master.description}
                </div>
            </figcaption>
        </figure>
    );
};

export default MasterItem;
