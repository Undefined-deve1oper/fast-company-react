import React, { useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { loginFormValidatorConfig } from "../../utils/validatorConfig";
import { useHistory } from "react-router-dom";
import FormComponent from "../common/form";
import { useDispatch } from "react-redux";
import { login } from "../../store/users";

const initialData = {
    email: "",
    password: "",
    stayOn: false
};

const LoginForm = () => {
    const history = useHistory();
    const data = initialData;
    const validatorConfig = loginFormValidatorConfig;
    const [enterError, setEnterError] = useState(null);
    const dispatch = useDispatch();

    const handleChange = () => {
        setEnterError(null);
    };

    const handleSubmit = (data) => {
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        try {
            dispatch(login({ payload: data, redirect }));
        } catch (error) {
            setEnterError(error.message);
        }
    };

    return (
        <FormComponent
            onSubmit={ handleSubmit }
            validatorConfig={ validatorConfig }
            defaultData={ data }
            onChange={ handleChange }
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
            <>{ enterError && <p className="text-danger">{ enterError }</p> }</>
            <button disabled={ enterError } className="btn btn-primary w-100 mx-auto">
                Submit
            </button>
        </FormComponent>
    );
};

export default LoginForm;
