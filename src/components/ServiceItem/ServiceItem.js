import React, { Component } from "react";
import "./ServiceItem.scss";

class ServiceItem extends Component {
    state = {
        checkedCheckBox: false
    };

    onClickHandler = () => {
        let checked = !this.state.checkedCheckBox;

        this.props.clicked(this.props.service, checked);

        this.setState(prevState => ({
            checkedCheckBox: checked
        }));
    };

    render() {
        return (
            <div
                class="widget__item service-item"
                onClick={this.onClickHandler}
            >
                <div class="service-item__info">
                    <div class="service-item__info-title">
                        <span>{this.props.service.title}</span>
                        <span class="service-item__duration">
                            {this.props.service.duration} min
                        </span>
                    </div>
                    <div class="service-item__info-price">
                        {this.props.service.cost} BGN
                    </div>
                </div>
                <div class="service-item__checkbox">
                    <input
                        type="checkbox"
                        id="service"
                        class="service-item__checkbox-input"
                        checked={this.state.checkedCheckBox}
                        onChange={this.onClickHandler}
                    />
                    <label for="service" class="service-item__checkbox-label">
                        <span class="service-item__checkbox-button" />
                    </label>
                </div>
            </div>
        );
    }
}

export default ServiceItem;
