import React, { Component } from "react";
import { connect } from "react-redux";

//Redux actions
import * as actions from "../../store/actions/index";

import "./Checkout.scss";

class Checkout extends Component {
    state = {
        phone: null,
        code: null,
        comment: null,
        codeSent: false,
        codeChecked: false
    };

    onChangeMobilePhoneHandler = event => {
        const updatePhone = event.target.value;
        this.setState({ phone: updatePhone });
    };

    onChangeCommentHandler = event => {
        const updateComment = event.target.value;
        this.setState({ comment: updateComment });
    };

    onChangeCodeHandler = event => {
        const updateCode = event.target.value;
        this.setState({ code: updateCode });
    };

    sendCheckCode() {
        const phone = this.state.phone;
        this.props.checkPhone(phone);
    }

    checkReceivedCode() {
        const phone = this.state.phone;
        const code = this.state.code;

        this.props.checkReceivedCode(phone, code);
    }

    onSendCodeAgain = event => {
        event.preventDefault();
        this.sendCheckCode();
    };

    onBookHandler = () => {
        if (!this.state.codeSent) {
            this.sendCheckCode();
            this.setState({ codeSent: true });
        } else {
            this.checkReceivedCode();
        }
    };

    render() {
        return (
            <div className="checkout">
                <div className="checkout__master">
                    <span>{this.props.master.firstName}</span>
                </div>
                <div className="checkout__invoice">
                    <strong>
                        {this.props.selectedTime.date}/
                        {this.props.selectedTime.time}
                    </strong>
                    <ul>
                        {this.props.services.map(service => (
                            <li key={service._id}>
                                {service.title}/{service.cost}
                            </li>
                        ))}
                    </ul>
                    total:
                    {this.props.services.reduce(
                        (sum, item) => sum + item.cost,
                        0
                    )}
                </div>
                <hr />
                <div className="contact-data">
                    <form className="contact-data__form">
                        <div className="contact-data__form-group">
                            <label for="client-phone">Mobile phone</label>
                            <input
                                type="text"
                                id="client-phone"
                                name="phone"
                                placeholder="+359"
                                onChange={this.onChangeMobilePhoneHandler}
                            />
                        </div>
                        <div className="contact-data__form-group">
                            <label for="client-comment">Comment</label>
                            <textarea
                                id="client-comment"
                                name="comment"
                                placeholder="Enter your comment"
                                onChange={this.onChangeCommentHandler}
                            />
                        </div>
                        {this.state.codeSent && (
                            <React.Fragment>
                                <div className="contact-data__form-group">
                                    <label for="client-code">Check code</label>
                                    <input
                                        type="text"
                                        id="client-code"
                                        name="code"
                                        placeholder="Your received code"
                                        onChange={this.onChangeCodeHandler}
                                    />
                                </div>
                                <button onClick={this.onSendCodeAgain}>
                                    Send code again
                                </button>
                            </React.Fragment>
                        )}
                    </form>
                    <button onClick={this.onBookHandler}>Book</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        master: state.widget.master,
        services: state.widget.services,
        selectedTime: state.widget.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkPhone: phone => dispatch(actions.checkPhone(phone)),
        checkReceivedCode: (phone, code) =>
            dispatch(actions.checkReceivedCode(phone, code))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
