import React from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { loginFormValidatorConfig } from "../../utils/validatorConfig";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FormComponent from "../common/form";

const initialData = {
    email: "",
    password: "",
    stayOn: false
};

const LoginForm = () => {
    const history = useHistory();
    const { signIn } = useAuth();
    const data = initialData;

    const handleSubmit = async (data, setErrors) => {
        try {
            await signIn(data);
            history.replace("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <FormComponent
            onSubmit={handleSubmit}
            validatorConfig={loginFormValidatorConfig}
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
            <CheckBoxField
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto">
                Submit
            </button>
        </FormComponent>
    );
};

export default LoginForm;
