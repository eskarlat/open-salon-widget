import React from "react";
import moment from "moment";
import { connect } from "react-redux";

import Backdrop from "./Backdrop/Backdrop";

import "./Modal.scss";

const Modal = props => {
    return (
        <Backdrop clicked={props.closed}>
            <div className="widget__modal">
                <div className="widget__modal--header">
                    <h4 className="widget__modal--header--text">
                        {moment(props.reservation.start).format("LLL")} -{" "}
                        {moment(props.reservation.end).format("LT")}
                    </h4>
                    <span
                        className="widget__modal--header--close"
                        onClick={props.closed}
                    >
                        &times;
                    </span>
                </div>
                <div className="widget__modal--body">
                    <div className="widget__summary">
                        <figure className="widget__summary-master master-item">
                            <figcaption className="master-item__info">
                                <div className="master-item__info-name">
                                    {props.reservation.master.firstName}
                                </div>
                                <div className="master-item__info-job">
                                    {props.reservation.master.description}
                                </div>
                            </figcaption>
                        </figure>
                        <div className="widget__summary--table">
                            {props.reservation.services.map(service => (
                                <div
                                    key={service._id}
                                    className="widget__summary--row"
                                >
                                    <div className="widget__summary-service">
                                        {service.title}
                                    </div>
                                    <div className="widget__summary-price">
                                        {service.cost} {props.salonCurrency}
                                    </div>
                                </div>
                            ))}
                            <div className="widget__summary--total">
                                <span>Total:</span>
                                <span>
                                    {props.reservation.services.reduce(
                                        (sum, item) => sum + item.cost,
                                        0
                                    )}{" "}
                                    {props.salonCurrency}
                                </span>
                            </div>
                            <p>Your comment: {props.reservation.comment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

const mapStateToProps = state => {
    return {
        salonCurrency: state.sal.salon.currency
    };
};

export default connect(mapStateToProps)(Modal);
