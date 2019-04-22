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
            <div className="service-item" onClick={this.onClickHandler}>
                <span>{this.props.service.title}</span>/
                <span>{this.props.service.duration}</span>/
                <span>{this.props.service.cost}</span>
                <input
                    type="checkbox"
                    checked={this.state.checkedCheckBox}
                    onChange={this.onClickHandler}
                />
            </div>
        );
    }
}

export default ServiceItem;
