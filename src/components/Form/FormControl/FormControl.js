import React from "react";

const FormControl = props => {
    let inputElement = null;
    let validationError = null;
    let hasError = false;

    if (props.invalid && props.shouldValidate && props.touched) {
        hasError = true;
    }

    switch (props.elementType) {
        case "input":
            inputElement = (
                <React.Fragment>
                    <label htmlFor={props.elementConfig.name}>
                        {props.label}
                    </label>
                    <input
                        id={props.elementConfig.name}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                    {hasError && <p>{props.helperText}</p>}
                </React.Fragment>
            );
            break;
        case "textarea":
            inputElement = (
                <React.Fragment>
                    <label htmlFor={props.elementConfig.name}>
                        {props.label}
                    </label>
                    <textarea
                        id={props.elementConfig.name}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                    {hasError && <p>{props.helperText}</p>}
                </React.Fragment>
            );
            break;
        default:
            break;
    }

    return inputElement;
};

export default FormControl;
