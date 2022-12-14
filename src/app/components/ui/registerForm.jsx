import React from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { registerFormValidatorConfig } from "../../utils/validatorConfig";
import FormComponent from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const initialData = {
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
};

const RegisterForm = () => {
    const dispatch = useDispatch();
    const data = initialData;
    const validatorConfig = registerFormValidatorConfig;
    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professions = useSelector(getProfessions());
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const handleSubmit = async (data, setErrors) => {
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        dispatch(signUp(newData));
    };

    return (
        <FormComponent
            onSubmit={handleSubmit}
            validatorConfig={validatorConfig}
            defaultData={data}
        >
            <TextField id="email" name="email" label="Email" autoFocus />
            <TextField id="name" name="name" label="Имя" />
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
                options={professionsList}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                name="sex"
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualitiesList}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField name="licence">
                Подтвердить <a>лицензионное</a> сообщение
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto">Submit</button>
        </FormComponent>
    );
};

export default RegisterForm;
