import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// SCSS MAIN
import "./App.scss";

//Layouts
import BasicLayout from "./layouts/Basic/Basic";

//Containers
import LocationContainer from "./containers/Location/Location";
import ServicesContainer from "./containers/Services/Services";
import MastersContainer from "./containers/Masters/Masters";
import SelectTimeContainer from "./containers/SelectTime/SelectTime";
import CheckoutContainer from "./containers/Checkout/Checkout";
import ConfirmationContainer from "./containers/Confirmation/Confirmation";
import ProfileContainer from "./containers/Profile/Profile";

class App extends Component {
    render() {
        let routers = (
            <Switch>
                <Route path="/" exact component={LocationContainer} />
                <Route
                    path="/booking/location"
                    exact
                    component={LocationContainer}
                />
                <Route
                    path="/booking/services"
                    exact
                    component={ServicesContainer}
                />
                <Route
                    path="/booking/masters"
                    exact
                    component={MastersContainer}
                />
                <Route
                    path="/booking/time"
                    exact
                    component={SelectTimeContainer}
                />
                <Route
                    path="/booking/checkout"
                    exact
                    component={CheckoutContainer}
                />
                <Route
                    path="/booking/confirmation"
                    component={ConfirmationContainer}
                />
                <Route path="/profile" exact component={ProfileContainer} />
            </Switch>
        );

        if (
            !this.props.selectedLocation &&
            this.props.location.pathname !== "/booking/location" &&
            this.props.location.pathname !== "/" &&
            this.props.location.pathname !== "/booking/confirmation" &&
            this.props.location.pathname !== "/profile"
        ) {
            routers = <Redirect to="/" />;
        }

        return <BasicLayout>{routers}</BasicLayout>;
    }
}

const mapStateToProps = state => {
    return {
        selectedLocation: state.widget.location
    };
};

export default connect(mapStateToProps)(withRouter(App));
