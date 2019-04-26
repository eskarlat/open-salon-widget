import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

//Components
import Form from "../../components/Form/Form";

//Redux actions
import * as actions from "../../store/actions/index";

//Util
import { updateObject, validation, updateForm } from "../../shared/utility";

import "./Checkout.scss";

class Checkout extends Component {
    state = {
        form: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "name",
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
                    name: "email"
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
                    name: "phone"
                },
                label: "Mobile phone",
                value: "",
                validation: validation({
                    required: true
                }),
                valid: false,
                touched: false
            },
            comment: {
                elementType: "textarea",
                elementConfig: {
                    type: "text",
                    name: "comment"
                },
                label: "Your comment",
                value: "",
                validation: validation({}),
                valid: true,
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
        const phone = this.state.form.phone.value;
        const code = this.state.code;

        this.props.checkReceivedCode(phone, code);
    };

    onSendCodeAgain = event => {
        event.preventDefault();
        this.sendCheckCode();
    };

    onBookHandler = event => {
        event.preventDefault();
        if (!this.state.codeSent) {
            this.sendCheckCode();
            this.setState({ codeSent: true });
        } else {
            this.checkReceivedCode();
        }
    };

    isValidToBook = () => {
        if (!this.props.clientExist) {
            return !this.state.formIsValid;
        } else {
            return !this.state.form.phone.valid;
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
                    <Form
                        form={_.pick(this.state.form, ["phone", "comment"])}
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
                                <label htmlFor="client-code">Check code</label>
                                <input
                                    type="text"
                                    id="client-code"
                                    name="code"
                                    placeholder="Your received code"
                                    required
                                    onChange={this.onChangeCodeInput}
                                />
                            </div>
                            <button onClick={this.onSendCodeAgain}>
                                Send code again
                            </button>
                            {this.props.error && <p>{this.props.error}</p>}
                        </React.Fragment>
                    )}
                    <button
                        type="submit"
                        disabled={this.isValidToBook()}
                        onClick={this.onBookHandler}
                    >
                        Book
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        master: state.widget.master,
        services: state.widget.services,
        selectedTime: state.widget.time,
        clientExist: state.widget.clientExist,
        error: state.widget.error
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
