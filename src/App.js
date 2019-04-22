import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//Layouts
import BasicLayout from "./layouts/Basic/Basic";

//Containers
import LocationContainer from "./containers/Location/Location";
import ServicesContainer from "./containers/Services/Services";
import MastersContainer from "./containers/Masters/Masters";
import SelectTimeContainer from "./containers/SelectTime/SelectTime";

class App extends Component {
    render() {
        return (
            <BasicLayout>
                <Switch>
                    <Route
                        path="/booking/location"
                        component={LocationContainer}
                    />
                    <Route
                        path="/booking/services"
                        component={ServicesContainer}
                    />
                    <Route
                        path="/booking/masters"
                        component={MastersContainer}
                    />
                    <Route
                        path="/booking/time"
                        component={SelectTimeContainer}
                    />
                </Switch>
            </BasicLayout>
        );
    }
}

export default App;
