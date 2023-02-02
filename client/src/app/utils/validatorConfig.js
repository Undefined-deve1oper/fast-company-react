export const editUserValidatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Email введен некорректно"
        }
    },
    name: {
        isRequired: {
            message: "Введите ваше имя"
        }
    }
};

export const addCommentValidatorConfig = {
    content: {
        isRequired: {
            message: "Сообщение не может быть пустым"
        }
    }
};

export const registerFormValidatorConfig = {
    name: {
        isRequired: {
            message: "Имя обязателено для заполнения"
        },
        min: {
            message: `Имя должено состоять минимум из 2 символов`,
            value: 2
        }
    },
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
    },
    profession: {
        isRequired: {
            message: "Обязательно выберите вашу профессию"
        }
    },
    licence: {
        isRequired: {
            message:
                "Вы не можете спользовать наш сервис без подтверждения лицензионного соглашения"
        }
    }
};

export const loginFormValidatorConfig = {
    email: {
        isRequired: {
            message: "Email обязателен для заполнения"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        }
    }
};
