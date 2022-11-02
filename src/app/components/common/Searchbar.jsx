import React from "react";
import PropTypes from "prop-types";

const Searchbar = ({ value, onChange }) => {
    return (
        <div className="input-group mb-3">
            <i className="bi bi-search input-group-text"></i>
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

Searchbar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Searchbar;
