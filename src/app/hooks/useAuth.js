import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            console.log("Поздравляем, вы вошли в аккаунт");
        } catch (error) {
            const { code, message } = error.response.data.error;
            const errors = {};

            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    errors.email =
                        "Пользователя с введеным E-mail не существует";
                }
                if (message === "INVALID_PASSWORD") {
                    errors.password = "Неверный пароль";
                }
                throw errors;
            }
        }
    }
    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
