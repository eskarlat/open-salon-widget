import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import List from "../../components/List/List";
import MasterItem from "../../components/MasterItem/MasterItem";
import FilterItems from "../../components/FilterItems/FilterItems";

//Redux actions
import * as actions from "../../store/actions/index";

class Masters extends Component {
    state = {
        filteredItems: []
    };

    componentDidMount() {
        this.props.fetchMasters();
    }

    filterHandler = filterString => {
        let filteredItems = this.props.masters;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.firstName.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    masterHandler = master => {
        this.props.selectMaster(master);
        this.props.history.push("/booking/time");
    };

    render() {
        let masters = null;

        if (this.state.filteredItems.length > 0) {
            masters = this.state.filteredItems;
        } else {
            masters = this.props.masters;
        }

        return (
            <React.Fragment>
                <List>
                    <FilterItems onFilter={this.filterHandler} />
                    {masters.map(master => (
                        <MasterItem
                            key={master._id}
                            master={master}
                            clicked={this.masterHandler}
                        />
                    ))}
                </List>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        masters: state.mas.masters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMasters: salonId => dispatch(actions.fetchMasters(salonId)),
        selectMaster: master => dispatch(actions.selectMaster(master))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Masters);
