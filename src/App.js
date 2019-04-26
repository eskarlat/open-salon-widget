import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Layouts
import BasicLayout from "./layouts/Basic/Basic";

//Containers
import LocationContainer from "./containers/Location/Location";
import ServicesContainer from "./containers/Services/Services";
import MastersContainer from "./containers/Masters/Masters";
import SelectTimeContainer from "./containers/SelectTime/SelectTime";
import CheckoutContainer from "./containers/Checkout/Checkout";
import ConfirmationContainer from "./containers/Confirmation/Confirmation";

class App extends Component {
    render() {
        let routers = (
            <Switch>
                <Route path="/booking/location" component={LocationContainer} />
                <Route path="/booking/services" component={ServicesContainer} />
                <Route path="/booking/masters" component={MastersContainer} />
                <Route path="/booking/time" component={SelectTimeContainer} />
                <Route path="/booking/checkout" component={CheckoutContainer} />
                <Route
                    path="/booking/confirmation"
                    component={ConfirmationContainer}
                />
            </Switch>
        );

        if (
            !this.props.selectedLocation &&
            this.props.location.pathname !== "/booking/location" &&
            this.props.location.pathname !== "/" &&
            this.props.location.pathname !== "/booking/confirmation"
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
