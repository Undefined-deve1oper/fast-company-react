import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionsService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getProfessionsList() {
        try {
            const { content } = await professionsService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher();
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    return (
        <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
            { children }
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
