import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import List from "../../components/List/List";
import MasterItem from "../Masters/MasterItem/MasterItem";
import FilterItems from "../../components/FilterItems/FilterItems";

//Redux actions
import * as actions from "../../store/actions/index";

class Masters extends Component {
    state = {
        masters: [
            {
                id: 1,
                firstName: "Anton",
                lastName: "Glamozda",
                title: "barber",
                instagram: "test"
            },
            {
                id: 2,
                firstName: "Andrej",
                lastName: "Kara",
                title: "barber",
                instagram: "test"
            },
            {
                id: 3,
                firstName: "Kiril",
                lastName: "Kirilov",
                title: "barber",
                instagram: "test"
            }
        ],
        filteredItems: []
    };

    filterHandler = filterString => {
        let filteredItems = this.state.masters;
        const filter = filterString.toLowerCase();

        filteredItems = filteredItems.filter(item => {
            const firstName = item.firstName.toLowerCase();
            return firstName.indexOf(filter) !== -1;
        });

        this.setState({ filteredItems });
    };

    masterHandler = master => {
        this.props.selectMaster(master);
        this.props.history.replace("/booking/time");
    };

    render() {
        let masters = null;

        if (this.state.filteredItems.length > 0) {
            masters = this.state.filteredItems;
        } else {
            masters = this.state.masters;
        }

        return (
            <React.Fragment>
                <List>
                    <FilterItems onFilter={this.filterHandler} />
                    {masters.map(master => (
                        <MasterItem
                            key={master.id}
                            master={master}
                            clicked={this.masterHandler}
                        />
                    ))}
                </List>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectMaster: master => dispatch(actions.selectMaster(master))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Masters);
