import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, _id, name }) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    _id: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
};

export default Quality;
