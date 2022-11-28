import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { loginFormValidatorConfig } from "../../utils/validatorConfig";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});

    const validatorConfig = loginFormValidatorConfig;
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="email"
                name="email"
                label="Email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                id="password"
                name="password"
                label="Пароль"
                type="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                name="stayOn"
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
                            Submit
            </button>
        </form>
    );
};

export default LoginForm;
