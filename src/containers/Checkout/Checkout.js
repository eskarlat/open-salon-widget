import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

//Components
import Form from "../../components/Form/Form";
import List from "../../components/List/List";

//Redux actions
import * as actions from "../../store/actions/index";

//Util
import { updateObject, validation, updateForm } from "../../shared/utility";

import "./Checkout.scss";
import Instagram from "../../assets/SVG/instagram-with-circle.svg";

class Checkout extends Component {
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
            },
            comment: {
                elementType: "textarea",
                elementConfig: {
                    type: "text",
                    name: "comment",
                    placeholder: "Enter some extra information"
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.receivedCodeValid) {
            const formData = {};

            for (let formId in this.state.form) {
                formData[formId] = this.state.form[formId].value;
            }

            const services = this.props.services.reduce(
                (servicesId, service) => {
                    servicesId.push(service._id);
                    return servicesId;
                },
                []
            );

            const booking = {
                salonId: "5cbefd540a9d662b3c917584",
                locationId: this.props.selectedLocation._id,
                services: services,
                masterId: this.props.master._id,
                date: this.props.selectedTime.date,
                time: this.props.selectedTime.time,
                comment: formData.comment
            };

            const user = {
                phone: formData.phone
            };

            this.props.onBooking(booking, user);
        }

        if (nextProps.bookingSuccess) {
            this.props.history.push("/booking/confirmation");
        }
    }

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

    selectedDate = () => {
        return moment(this.props.selectedTime.date).format("LL");
    };

    render() {
        return (
            <List>
                <h2 className="widget__heading">Summary</h2>
                <div className="widget__summary">
                    <figure className="widget__summary-master master-item">
                        <div className="master-item__user-image">
                            <img
                                src={this.props.master.avatar}
                                alt="master 1"
                                className="master-item__photo"
                            />
                            <div className="master-item__user-image-instagram">
                                <img
                                    className="master-item__icon"
                                    src={Instagram}
                                    alt={this.props.master.firstName}
                                />
                            </div>
                        </div>
                        <figcaption className="master-item__info">
                            <div className="master-item__info-name">
                                {this.props.master.firstName}
                            </div>
                            <div className="master-item__info-job">
                                {this.props.master.description}
                            </div>
                        </figcaption>
                    </figure>
                    <div class="widget__summary--time">
                        {this.selectedDate()}, в {this.props.selectedTime.time}
                    </div>
                    <div className="widget__summary--table">
                        {this.props.services.map(service => (
                            <div key={service._id} class="widget__summary--row">
                                <div class="widget__summary-service">
                                    {service.title}
                                </div>
                                <div class="widget__summary-price">
                                    {service.cost} BGN
                                </div>
                            </div>
                        ))}
                        <div class="widget__summary--total">
                            <span>Total:</span>
                            <span>
                                {this.props.services.reduce(
                                    (sum, item) => sum + item.cost,
                                    0
                                )}{" "}
                                BGN
                            </span>
                        </div>
                    </div>
                </div>
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
                        type="submit"
                        disabled={this.isValidToBook()}
                        onClick={this.onBookHandler}
                        className="btn btn--primary"
                    >
                        Book
                    </button>
                </div>
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        master: state.widget.master,
        services: state.widget.services,
        selectedLocation: state.widget.location,
        selectedTime: state.widget.time,
        clientExist: state.widget.clientExist,
        error: state.widget.error,
        receivedCodeValid: state.widget.receivedCodeValid,
        bookingSuccess: state.widget.bookingSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkPhone: phone => dispatch(actions.checkPhone(phone)),
        checkReceivedCode: (user, code) =>
            dispatch(actions.checkReceivedCode(user, code)),
        onBooking: (booking, user) => dispatch(actions.booking(booking, user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
