import React from "react";
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
import FormComponent from "../common/form";

const initialData = {
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
};

const RegisterForm = () => {
    const history = useHistory();
    const data = initialData;
    const { signUp } = useAuth();
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }));
    const professionsList = professions.map((p) => ({ label: p.name, value: p._id }));

    const handleSubmit = async (data, setErrors) => {
        const newData = { ...data, qualities: data.qualities.map((q) => q.value) };

        try {
            await signUp(newData);
            history.replace("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <FormComponent
            onSubmit={ handleSubmit }
            validatorConfig={registerFormValidatorConfig}
            defaultData={ data }
        >
            <TextField
                id="email"
                name="email"
                label="Email"
                autoFocus
            />
            <TextField
                id="password"
                name="password"
                label="Пароль"
                type="password"
            />
            <SelectField
                label="Выберите вашу профессию"
                defaultOption="Choose..."
                name="profession"
                options={ professionsList }
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
                options={ qualitiesList }
                defaultValue={ data.qualities }
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField
                name="licence"
            >
                Подтвердить <a>лицензионное</a> сообщение
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto">
                Submit
            </button>
        </FormComponent>
    );
};

export default RegisterForm;
