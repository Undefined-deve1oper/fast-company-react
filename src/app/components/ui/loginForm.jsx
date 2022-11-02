import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email обязателен для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: `Пароль должен состоять минимум из 8 символов`,
                value: 8
            }
        }
    };
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
