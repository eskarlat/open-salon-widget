import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import "./Login.scss";

import Form from "../../components/Form/Form";

//Util
import { updateObject, validation, updateForm } from "../../shared/utility";

//Redux actions
import * as actions from "../../store/actions/index";

class Login extends Component {
    state = {
        form: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "Enter your name",
                    autoFocus: true
                },
                label: "Your name",
                value: "",
                validation: validation({
                    required: true,
                    min: 5
                }),
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "example@gmail.com"
                },
                label: "Email",
                value: "",
                validation: validation({
                    required: true,
                    isEmail: true
                }),
                valid: false,
                touched: false
            },
            phone: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "phone",
                    placeholder: "+359"
                },
                label: "Mobile phone",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            }
        },
        code: null,
        codeSent: false,
        formIsValid: false
    };

    inputChangedHandler = (event, inputId) => {
        const { updatedForm, formIsValid } = updateForm({
            form: this.state.form,
            event,
            inputId
        });

        this.setState({ form: updatedForm, formIsValid: formIsValid });
    };

    onChangeCodeInput = event => {
        const updateSate = updateObject(this.state, {
            code: event.target.value
        });

        this.setState(updateSate);
    };

    sendCheckCode = () => {
        const phone = this.state.form.phone.value;
        this.props.checkPhone(phone);
    };

    checkReceivedCode = () => {
        const formData = {};

        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value;
        }

        const user = {
            phone: formData.phone,
            name: formData.name,
            email: formData.email
        };

        const code = this.state.code;

        this.props.checkReceivedCode(user, code);
    };

    onSendCodeAgain = event => {
        event.preventDefault();
        this.sendCheckCode();
    };

    onLoginHandler = event => {
        event.preventDefault();
        if (!this.state.codeSent) {
            this.sendCheckCode();
            this.setState({ codeSent: true });
        } else {
            this.checkReceivedCode();
        }
    };

    render() {
        return (
            <div className="widget-login">
                <h2 className="widget__heading">Авторизация</h2>
                <div className="widget-login__wrapper">
                    <Form
                        form={_.pick(this.state.form, ["phone"])}
                        onChange={this.inputChangedHandler}
                        onSubmit={this.onSubmitHandler}
                    />

                    {!this.props.clientExist && (
                        <Form
                            form={_.pick(this.state.form, ["name", "email"])}
                            onChange={this.inputChangedHandler}
                            onSubmit={this.onSubmitHandler}
                        />
                    )}
                    {this.state.codeSent && (
                        <React.Fragment>
                            <div className="contact-data__form-group">
                                <label
                                    htmlFor="client-code"
                                    className="widget__form--label"
                                >
                                    Check code
                                </label>
                                <input
                                    type="text"
                                    id="client-code"
                                    name="code"
                                    placeholder="Your received code"
                                    required
                                    onChange={this.onChangeCodeInput}
                                    className="widget__form--input"
                                />
                            </div>
                            <button
                                onClick={this.onSendCodeAgain}
                                className="btn btn--link"
                            >
                                Send code again
                            </button>
                            {this.props.error && <p>{this.props.error}</p>}
                        </React.Fragment>
                    )}
                    <button
                        className="btn btn--primary"
                        onClick={this.onLoginHandler}
                    >
                        Log in
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clientExist: state.widget.clientExist
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkPhone: phone => dispatch(actions.checkPhone(phone)),
        checkReceivedCode: (user, code) =>
            dispatch(actions.checkReceivedCode(user, code))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
