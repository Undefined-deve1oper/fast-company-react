import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
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

    const handleChange = ({ target }) => {
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
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
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
