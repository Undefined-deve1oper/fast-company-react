import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import FormComponent, { MultiSelectField, RadioField, SelectField, TextField } from "../../common/form";
import { editUserValidatorConfig } from "../../../utils/validatorConfig";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserData, getCurrentUserId, updateCurrentUserData } from "../../../store/users";

const initialState = {
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
};

const EditUserPage = () => {
    const history = useHistory();
    const { userId } = useParams();
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserData());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());

    const [data, setData] = useState(initialState);
    const [isLoading, setLoading] = useState(true);

    const transformData = (data) => {
        return data.map((item) => ({ label: item.name, value: item._id, color: item.color }));
    };
    const dataQualities = (elements) => {
        return elements.map((quality) => quality.value);
    };

    function getQualitiesListByIds(qualitiesIds) {
        return qualities.filter((quality) => qualitiesIds.includes(quality._id));
    }

    useEffect(() => {
        if (userId !== currentUserId) {
            history.push(`/users/${currentUserId}/edit`);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        if (!qualitiesLoading && currentUser) {
            setData((prevState) => ({
                ...currentUser,
                qualities: transformData(getQualitiesListByIds(currentUser.qualities))
            }));
        }
    }, [currentUser, qualitiesLoading]);
    useEffect(() => {
        if (data._id) setLoading(false);
    }, [data]);

    const handleSubmit = async (data) => {
        const { profession, qualities } = data;
        const updatedData = {
            ...data,
            profession: profession,
            qualities: dataQualities(qualities)
        };
        dispatch(updateCurrentUserData(updatedData));
    };

    const isEverythingIsLoaded = !isLoading && !professionsLoading && !qualitiesLoading;

    if (!isEverythingIsLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton/>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <FormComponent
                        onSubmit={ handleSubmit }
                        validatorConfig={ editUserValidatorConfig }
                        defaultData={ data }
                    >
                        <TextField
                            label="Имя"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            options={ transformData(professions) }
                            name="profession"
                        />
                        <RadioField
                            options={ [
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ] }
                            name="sex"
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            defaultValue={ data.qualities }
                            options={ transformData(qualities) }
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </FormComponent>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
