import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue, ...rest }) => {
    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={options}
                name={name}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                {...rest}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
