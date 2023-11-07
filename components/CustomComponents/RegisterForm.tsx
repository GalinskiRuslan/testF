"use client"
import { register } from '@/store/redusersRedux/loginReduser';
import { AppDispatch } from '@/store/reduxStore';
import React from 'react'
import { useDispatch } from 'react-redux';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm = ({ closeModal }: Props) => {
    const [userMail, setUserMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const [name, setName] = React.useState("")
    const [error, setError] = React.useState(0)
    const [errorText, setErrorText] = React.useState("")
    const dispatch = useDispatch<AppDispatch>();

    const clickRegister = async () => {
        if (userMail.length < 1 || password.length < 1 || repeatPassword.length < 1 || name.length < 1) {
            setError(1)
            setErrorText("Заполните все поля")
        }
        else if (password !== repeatPassword) {
            setError(1)
            setErrorText("Пароли не совпадают")
        }
        else {
            setError(0)
            dispatch(register({ user_name: name, password, user_email: userMail }))
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); clickRegister() }}>
            <input type="email" placeholder='Введите почту' value={userMail} onChange={(e) => setUserMail(e.target.value)} />
            <input type="password" placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder='Повторите пароль' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            <input type="text" placeholder='Введите имя пользователя' value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Зарегистрироваться</button>
            <p style={{ color: "red", opacity: `${error}` }}>{errorText}</p>
        </form>
    )
}
