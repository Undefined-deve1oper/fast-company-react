import React from "react";
import PropTypes from "prop-types";

const UsersFilter = ({ filter, setFilter }) => {
    return (
        <div className="input-group mb-3">
            <i className="bi bi-search input-group-text"></i>
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
        </div>
    );
};

UsersFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired
};

export default UsersFilter;
