import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, name, error, ...rest }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={ name }
                name={ name }
                value={value}
                onChange={handleChange}
                {...rest}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {options.length > 0 && options.map((option) =>
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.label}
                    </option>
                )}
            </select>
            {error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    );
};

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SelectField;
