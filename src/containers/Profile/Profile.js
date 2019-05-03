import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.scss";
import noAvatar from "../../assets/img/no-user.jpg";

//Components
import Login from "../Login/Login";
import ReservationItem from "../../components/ReservationItem/ReservationItem";
import List from "../../components/List/List";
import Modal from "../../components/UI/Modal/Modal";

//Redux actions
import * as actions from "../../store/actions/index";

class Profile extends Component {
    state = {
        openDetails: false,
        detailReservation: null
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuth && !this.props.isAuth) {
            this.props.fetchReservations(nextProps.salon._id, nextProps.token);
        }
    }

    componentDidMount() {
        this.props.fetchReservations(this.props.salon._id, this.props.token);
    }

    openDetails = (event, reservation) => {
        this.setState({ detailReservation: reservation, openDetails: true });
    };

    closeDetails = () => {
        this.setState({ detailReservation: null, openDetails: false });
    };

    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <React.Fragment>
                <List>
                    {!this.props.isAuth && <Login />}
                    {this.props.isAuth && (
                        <div className="widget-profile">
                            <div className="widget-profile__wrapper">
                                <div className="widget-profile__header">
                                    <figure className="widget-profile__user">
                                        <img
                                            src={noAvatar}
                                            alt="user"
                                            className="widget-profile__user--photo"
                                        />
                                        <figcaption className="widget-profile__user--info">
                                            <span className="widget-profile__user--name">
                                                {this.props.client.name}
                                            </span>
                                            <a
                                                href="#"
                                                className="widget-profile__user--text"
                                                onClick={this.logout}
                                            >
                                                Logout
                                            </a>
                                        </figcaption>
                                    </figure>
                                    <div className="widget-profile__statistic">
                                        <div className="widget-profile__statistic--item">
                                            <div className="widget-profile__statistic--item--number">
                                                {this.props.reservations.length}
                                            </div>
                                            <div className="widget-profile__statistic--item--text">
                                                Bookings
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-profile__history">
                                    <h2 className="widget__heading">
                                        Bookings
                                    </h2>
                                    {this.props.reservations.map(
                                        (reservation, index) => (
                                            <ReservationItem
                                                key={index}
                                                reservation={reservation}
                                                clicked={this.openDetails}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </List>
                {this.state.openDetails && (
                    <Modal
                        reservation={this.state.detailReservation}
                        closed={this.closeDetails}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        reservations: state.res.reservations,
        client: state.res.client,
        isLoading: state.res.loading,
        salon: state.sal.salon
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchReservations: (salonId, token) =>
            dispatch(actions.fetchReservations(salonId, token)),
        logout: () => dispatch(actions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
