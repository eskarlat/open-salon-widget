import React, { Component } from "react";
import { connect } from "react-redux";
import "./Basic.scss";

//Components
import Sidebar from "../../components/Sidebar/Sidebar";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";

//Redux actions
import * as actions from "../../store/actions/index";

class Basic extends Component {
    componentWillMount() {
        this.props.authCheckState();
    }

    render() {
        return (
            <div className="widget-app">
                <section className="widget">
                    <ProgressBar />
                    <Sidebar />
                    <div className="widget__content">{this.props.children}</div>
                </section>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Basic);
