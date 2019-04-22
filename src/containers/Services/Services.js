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
        services: [
            { id: 1, title: "men hearcut", duration: 60, cost: 120 },
            {
                id: 2,
                title: "men hearcut with beard",
                duration: 120,
                cost: 320
            },
            { id: 3, title: "men hearcut with son", duration: 180, cost: 520 },
            { id: 4, title: "make less beard", duration: 30, cost: 80 }
        ],
        filteredItems: []
    };

    filterHandler = filterString => {
        let filteredItems = this.state.services;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const title = item.title.toLowerCase();
            return title.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    serviceHandler = (service, checked) => {
        const updatedService = [...this.props.services];

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
            services = this.state.services;
        }

        return (
            <React.Fragment>
                <List>
                    <FilterItems onFilter={this.filterHandler} />
                    {services.map(service => (
                        <ServiceItem
                            key={service.id}
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
        services: state.services
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectService: services => dispatch(actions.selectService(services))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Services);
