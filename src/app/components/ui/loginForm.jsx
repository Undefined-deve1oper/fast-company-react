import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuthError, login } from "../../store/users";
import { loginFormValidatorConfig } from "../../utils/validatorConfig";
import FormComponent from "../common/form";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";

const initialData = {
    email: "",
    password: "",
    stayOn: false
};

const LoginForm = () => {
    const history = useHistory();
    const data = initialData;
    const loginError = useSelector(getAuthError());
    const validatorConfig = loginFormValidatorConfig;
    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(login({ payload: data, redirect }));
    };

    return (
        <FormComponent
            onSubmit={handleSubmit}
            validatorConfig={validatorConfig}
            defaultData={data}
        >
            <TextField id="email" name="email" label="Email" autoFocus />
            <TextField
                id="password"
                name="password"
                label="Пароль"
                type="password"
            />
            <CheckBoxField name="stayOn">Оставаться в системе</CheckBoxField>
            <>{loginError && <p className="text-danger">{loginError}</p>}</>
            <button className="btn btn-primary w-100 mx-auto">Submit</button>
        </FormComponent>
    );
};

export default LoginForm;
