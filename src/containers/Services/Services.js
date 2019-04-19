import React, {Component} from 'react';
import { connect } from 'react-redux'

//Components
import List from '../../components/List/List';
import ServiceItem from '../Services/ServiceItem/ServiceItem';
import FilterItems from '../../components/FilterItems/FilterItems';

//Redux actions
import * as actions from '../../store/actions/index';

class Services extends Component {
    state = {
        services: [
            { id: 1, title: 'men hearcut', duration: 60, cost: 120 },
            { id: 2, title: 'men hearcut with beard', duration: 120, cost: 320 },
            { id: 3, title: 'men hearcut with son', duration: 180, cost: 520 },
            { id: 3, title: 'make less beard', duration: 30, cost: 80 },
        ],
        filteredItems: [],
    };

    filterHandler = filterString => {
        let filteredItems = this.state.services;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const title = item.title.toLowerCase();
            return title.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    }

    serviceHandler = (service) => {
        const updatedService = this.props.services;

        updatedService.push(service);

        this.props.selectService(updatedService);
        // this.props.history.replace('/booking/master');
    }

    render() {
        let services = null;

        if (this.state.filteredItems.length > 0) {
            services = this.state.filteredItems;
        }else {
            services = this.state.services;
        }

        return (
            <List>
                <FilterItems onFilter={this.filterHandler}/>
                {services.map(service => <ServiceItem service={service} clicked={this.serviceHandler}/>)}
            </List>
        );
    }
};

const mapStateToProps = state => {
    return {
        services: state.services
    }
};

const mapDispatchToProps = dispatch => {
    return {
        selectService: (services) => dispatch(actions.selectService(services))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);