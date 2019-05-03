import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Basic.scss";

//Components
import Sidebar from "../../components/Sidebar/Sidebar";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";

//Redux actions
import * as actions from "../../store/actions/index";

class Basic extends Component {
    state = {
        showContent: false
    };

    componentWillMount() {
        this.props.authCheckState();

        const queryParams = {};
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            queryParams[param[0]] = param[1];
        }

        this.props.getSalonInfo(queryParams.salon);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.salon._id) {
            this.setState({ showContent: true });
        }
    }

    onCancel = event => {
        window.parent.postMessage("closeOpenSalonWidget", "*");
    };

    render() {
        return (
            <div className="widget-app">
                {this.state.showContent && (
                    <React.Fragment>
                        <section className="widget">
                            <ProgressBar />
                            <Sidebar />
                            <div className="widget__content">
                                {this.props.children}
                                <button
                                    className="widget__close"
                                    onClick={this.onCancel}
                                >
                                    &times;
                                </button>
                            </div>
                        </section>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        salon: state.sal.salon
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState()),
        getSalonInfo: salonId => dispatch(actions.getSalonInfo(salonId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Basic));
