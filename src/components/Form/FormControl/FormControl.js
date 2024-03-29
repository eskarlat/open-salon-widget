import React from "react";

const FormControl = props => {
    let inputElement = null;
    let validationError = null;
    let hasError = false;

    if (props.invalid && props.shouldValidate && props.touched) {
        hasError = true;
    }

    const errorClass = hasError ? "widget__form--has-error" : null;

    const itemClass = ["widget__form--input", errorClass].join(" ");

    switch (props.elementType) {
        case "input":
            inputElement = (
                <div className="widget__form-group">
                    <label
                        htmlFor={props.elementConfig.name}
                        className="widget__form--label"
                    >
                        {props.label}
                    </label>
                    <input
                        id={props.elementConfig.name}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                        className={itemClass}
                    />
                    {hasError && (
                        <p className="widget__form--input--help-text">
                            {props.helperText}
                        </p>
                    )}
                </div>
            );
            break;
        case "textarea":
            inputElement = (
                <div className="widget__form-group">
                    <label
                        htmlFor={props.elementConfig.name}
                        className="widget__form--label"
                    >
                        {props.label}
                    </label>
                    <textarea
                        id={props.elementConfig.name}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                        className={itemClass}
                    />
                    {hasError && <p>{props.helperText}</p>}
                </div>
            );
            break;
        default:
            break;
    }

    return inputElement;
};

export default FormControl;
