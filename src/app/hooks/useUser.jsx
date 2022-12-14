import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsersList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getUsersList() {
        try {
            const { content } = await userService.fetchAll();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function updateUser(userId, data) {
        try {
            setLoading(true);
            const { content } = await userService.update(userId, data);
            setUsers(content);
            return content;
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    function getUserById(userId) {
        return users.find((user) => user._id === userId);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <UserContext.Provider value={ { users, isLoading, updateUser, getUserById } }>
            { !isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
