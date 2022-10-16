import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    if (user) {
        const { name, profession, qualities, completedMeetings, rate } = user;

        return (
            <div>
                <h1>{name}</h1>
                <h1>Профессия: {profession.name}</h1>
                <QualitiesList qualities={qualities}/>
                <h4>completedMeetings: {completedMeetings}</h4>
                <h2>Rate: {rate}</h2>

                <Link to="/users">
                    <button role="button">Все пользователи</button>
                </Link>
            </div>
        );
    }

    return <h1>Loading...</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
