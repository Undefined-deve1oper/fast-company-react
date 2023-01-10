import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getCurrentUserId } from "../../store/users";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const currentUserId = useSelector(getCurrentUserId());
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (!currentUser) return "Loading...";

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    className="img-responsive rounded-circle"
                    alt="profile"
                    height="40"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link className="dropdown-item" to={`/users/${currentUserId}`}>
                    Profile
                </Link>
                <Link className="dropdown-item" to="/logout">
                    Log Out
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
