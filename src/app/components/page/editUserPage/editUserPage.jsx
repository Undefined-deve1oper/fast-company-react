import React, { useState } from "react";
import api from "../../../api";
import { useHistory, useParams } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import FormComponent, { MultiSelectField, RadioField, SelectField, TextField } from "../../common/form";
import { editUserValidatorConfig } from "../../../utils/validatorConfig";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useUser } from "../../../hooks/useUser";

const initialState = {
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
};

const EditUserPage = () => {
    const { userId } = useParams();
    const { getUserById } = useUser();
    const history = useHistory();
    const [isLoading] = useState(false);
    const [data, setData] = useState(initialState);
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    const user = getUserById(userId);
    console.log(user, setData);

    // const [professions, setProfession] = useState([]);
    // const [qualities, setQualities] = useState([]);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const dataQualities = (elements) => {
        return Object.values(elements).map((quality) => {
            const isValid = data.qualities.map((dataQuality) => dataQuality.value).includes(quality.value);
            if (!isValid) return null;
            return {
                _id: quality.value,
                name: quality.label,
                color: quality.color
            };
        });
    };
    const handleSubmit = (data) => {
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: dataQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };
    // const transformData = (data) => {
    //     return data.map((qual) => ({ label: qual.name, value: qual._id }));
    // };

    if (!!professions && !!qualities) {
        const validatorConfig = editUserValidatorConfig;

        if (isLoading && Object.keys(professions).length === 0) {
            return <h1>Loading...</h1>;
        }

        return (
            <div className="container mt-5">
                <BackHistoryButton/>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <FormComponent
                            onSubmit={ handleSubmit }
                            validatorConfig={ validatorConfig }
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
                                options={ professions }
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
                                options={ qualities }
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
    }
    // const transformData = (data) => {
    //     return data.map((qual) => ({ label: qual.name, value: qual._id }));
    // };
    // useEffect(() => {
    //     setIsLoading(true);
    //     api.users.getById(userId).then(({ profession, qualities, ...data }) =>
    //         setData((prevState) => ({
    //             ...prevState,
    //             ...data,
    //             qualities: transformData(qualities),
    //             profession: profession._id
    //         }))
    //     );
    //     api.professions.fetchAll().then((data) => {
    //         const professionsList = Object.keys(data).map((professionName) => ({
    //             label: data[professionName].name,
    //             value: data[professionName]._id
    //         }));
    //         setProfession(professionsList);
    //     });
    //     api.qualities.fetchAll().then((data) => {
    //         const qualitiesList = Object.keys(data).map((optionName) => ({
    //             value: data[optionName]._id,
    //             label: data[optionName].name,
    //             color: data[optionName].color
    //         }));
    //         setQualities(qualitiesList);
    //     });
    // }, []);
    // useEffect(() => {
    //     if (data._id) setIsLoading(false);
    // }, [data]);
};

export default EditUserPage;
