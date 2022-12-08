import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";

const FormComponent = ({ children, validatorConfig, onSubmit, defaultData }) => {
    const [data, setData] = useState(defaultData || {});
    const [errors, setErrors] = useState({});

    const validate = useCallback((data) => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [validatorConfig, setErrors]);

    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }, []);
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        onSubmit(data);
    }, [data]);
    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.target.form;
            const indexField = Array.prototype.indexOf.call(form, event.target);
            form.elements[indexField + 1].focus();
        }
    }, []);
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate(data);
        }
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const clonedElements = React.Children.map(children, (child) => {
        const childType = typeof child.type;
        let config = {};

        if (childType === "function") {
            if (!child.props.name) {
                throw new Error(
                    "Name property is required for field component",
                    child
                );
            }
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name],
                onKeyDown: handleKeyDown
            };
        }
        if (childType === "string") {
            if (child.type === "button") {
                if (
                    child.props.type === "submit" ||
                    child.props.type === undefined
                ) {
                    config = { ...child.props, disabled: !isValid };
                }
            }
        }
        return React.cloneElement(child, config);
    });

    return (
        <form onSubmit={handleSubmit}>
            {clonedElements}
        </form>
    );
};

FormComponent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    defaultData: PropTypes.object,
    validatorConfig: PropTypes.object,
    onSubmit: PropTypes.func
};

export default FormComponent;
