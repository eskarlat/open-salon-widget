import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import List from "../../components/List/List";
import ServiceItem from "../Services/ServiceItem/ServiceItem";
import FilterItems from "../../components/FilterItems/FilterItems";

//Redux actions
import * as actions from "../../store/actions/index";

class Services extends Component {
    state = {
        filteredItems: []
    };

    componentDidMount() {
        this.props.fetchServices();
    }

    filterHandler = filterString => {
        let filteredItems = this.props.services;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const title = item.title.toLowerCase();
            return title.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    serviceHandler = (service, checked) => {
        const updatedService = [...this.props.checkedServices];

        if (checked) {
            updatedService.push(service);
        } else {
            updatedService.splice(updatedService.indexOf(service), 1);
        }

        this.props.selectService(updatedService);
    };

    nextBtnHandler = () => {
        this.props.history.replace("/booking/masters");
    };

    render() {
        let services = null;

        if (this.state.filteredItems.length > 0) {
            services = this.state.filteredItems;
        } else {
            services = this.props.services;
        }

        return (
            <React.Fragment>
                <List>
                    <FilterItems onFilter={this.filterHandler} />
                    {services.map(service => (
                        <ServiceItem
                            key={service._id}
                            service={service}
                            clicked={this.serviceHandler}
                        />
                    ))}
                </List>
                <button onClick={this.nextBtnHandler}>Next</button>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        services: state.ser.services,
        checkedServices: state.widget.services
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchServices: salonId => dispatch(actions.fetchServices(salonId)),
        selectService: services => dispatch(actions.selectService(services))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
