import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { registerFormValidatorConfig } from "../../utils/validatorConfig";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
};

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState(initialState);
    const { signUp } = useAuth();
    const { qualities } = useQualities();
    const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));
    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({ label: p.name, value: p._id }));
    const [errors, setErrors] = useState({});
    const validatorConfig = registerFormValidatorConfig;
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

        try {
            await signUp(newData);
            history.replace("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            <TextField
                id="email"
                name="email"
                label="Email"
                value={ data.email }
                onChange={ handleChange }
                error={ errors.email }
            />
            <TextField
                id="password"
                name="password"
                label="Пароль"
                type="password"
                value={ data.password }
                onChange={ handleChange }
                error={ errors.password }
            />
            <SelectField
                label="Выберите вашу профессию"
                defaultOption="Choose..."
                name="profession"
                options={ professionsList }
                onChange={ handleChange }
                value={ data.profession }
                error={ errors.profession }
            />
            <RadioField
                options={ [
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ] }
                value={ data.sex }
                name="sex"
                onChange={ handleChange }
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={ qualitiesList }
                onChange={ handleChange }
                defaultValue={ data.qualities }
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField
                value={ data.licence }
                name="licence"
                onChange={ handleChange }
                error={ errors.licence }
            >
                Подтвердить <a>лицензионное</a> сообщение
            </CheckBoxField>
            <button disabled={ !isValid } className="btn btn-primary w-100 mx-auto">
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
