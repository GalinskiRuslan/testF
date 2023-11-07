"use client"
import { fetchLogin } from '@/store/redusersRedux/loginReduser'
import { AppDispatch } from '@/store/reduxStore';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
type Props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const InnerForm = ({ closeModal }: Props) => {
    const { isLoading, isAuth } = useSelector<any, any>(state => state.login);
    const dispatch = useDispatch<AppDispatch>();
    const [userMail, setUserMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    useEffect(() => {
        if (isAuth) {
            closeModal(false)
        }
    }, [isAuth])

    if (isLoading) {
        return (<p>Loading....</p>)
    }
    else if (isAuth == false) {
        return (
            <form onSubmit={(e) => { e.preventDefault(); dispatch(fetchLogin({ user_email: userMail, password })) }}>
                <input type="text" placeholder='Введите почту' value={userMail} onChange={(e) => setUserMail(e.target.value)} />
                <input type="password" placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Войти</button>
            </form>
        )
    }
}