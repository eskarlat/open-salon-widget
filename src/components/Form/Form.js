import React from "react";

import FormControl from "./FormControl/FormControl";

const Form = props => {
    const formElementsArray = [];

    for (let key in props.form) {
        formElementsArray.push({
            id: key,
            config: props.form[key]
        });
    }

    return (
        <form onSubmit={props.onSubmit}>
            {formElementsArray.map(formElement => (
                <FormControl
                    changed={event => props.onChange(event, formElement.id)}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    invalid={!formElement.config.valid}
                    helperText={formElement.config.helperText}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    key={formElement.id}
                />
            ))}
            {props.children}
        </form>
    );
};

export default Form;
