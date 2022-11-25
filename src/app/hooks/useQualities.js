import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualitiesService from "../services/qualities.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.fetchAll();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher();
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getQuality(id) {
        return qualities.find((p) => p._id === id);
    }

    return (
        <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
            { children }
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
