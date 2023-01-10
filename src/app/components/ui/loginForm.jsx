import React from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { loginFormValidatorConfig } from "../../utils/validatorConfig";
import { useHistory } from "react-router-dom";
import FormComponent from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, login } from "../../store/users";

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
