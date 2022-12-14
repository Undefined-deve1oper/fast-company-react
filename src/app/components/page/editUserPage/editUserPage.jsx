import React, { useEffect, useState } from "react";
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
    const { getUserById, isLoading: userLoading, updateUser } = useUser();
    const history = useHistory();
    const [data, setData] = useState(initialState);
    const { professions, isLoading: professionsLoading } = useProfessions();
    const { qualities, getQuality, isLoading: qualitiesLoading } = useQualities();

    useEffect(() => {
        if (!userLoading) {
            const user = getUserById(userId);
            setData(prevState => ({
                ...prevState,
                ...user,
                qualities: transformData(user.qualities.map((item) => getQuality(item)))
            }));
        }
    }, []);

    const dataQualities = (elements) => {
        return elements.map((quality) => quality.value);
    };
    const handleSubmit = (data) => {
        const { profession, qualities, _id } = data;
        const updatedData = {
            ...data,
            profession: profession,
            qualities: dataQualities(qualities)
        };
        updateUser(userId, updatedData).then(() => history.push(`/users/${_id}`));
    };
    const transformData = (data) => {
        return data.map((item) => ({ label: item.name, value: item._id, color: item.color }));
    };

    const isLoading = !professionsLoading && !qualitiesLoading && JSON.stringify(data) === JSON.stringify(initialState);

    if (isLoading) {
        return <h1>Loading...</h1>;
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
