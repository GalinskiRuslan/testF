"use client"
import { register } from '@/store/redusersRedux/loginReduser';
import { AppDispatch } from '@/store/reduxStore';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm = ({ closeModal }: Props) => {
    const { isLoading, isAuth, registerError } = useSelector<any, any>(state => state.login);
    const [userMail, setUserMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const [name, setName] = React.useState("")
    const [errorS, setError] = React.useState(0)
    const [errorText, setErrorText] = React.useState("")
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isAuth) {
            closeModal(false)
        }
    }, [isAuth])

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
    if (isLoading) {
        return (<div className='loader_cont'><span className="loader"></span><div className='overray'></div></div>)
    }

    return (<>
        <form onSubmit={(e) => { e.preventDefault(); clickRegister() }}>
            <input className='input_login' type="email" placeholder='Введите почту' value={userMail} onChange={(e) => setUserMail(e.target.value)} /><br />
            <input className='input_login' type="password" placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <input className='input_login' type="password" placeholder='Повторите пароль' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} /><br />
            <input className='input_login' type="text" placeholder='Введите имя пользователя' value={name} onChange={(e) => setName(e.target.value)} /><br />
            <button className='header-left_btn' type="submit">Зарегистрироваться</button>
            <p style={{ color: "red", opacity: `${errorS}` }}>{errorText}</p>
        </form>
        {registerError?.response?.data ? <p style={{ color: "red" }}>{registerError.response?.data}</p> : null}
    </>
    )
}
