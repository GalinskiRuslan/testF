"use client"
import { fetchLogin } from '@/store/redusersRedux/loginReduser'
import { AppDispatch } from '@/store/reduxStore';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
type Props = {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const InnerForm = ({ closeModal }: Props) => {
    const { isLoading, isAuth, error, loginEroor } = useSelector<any, any>(state => state.login);
    const dispatch = useDispatch<AppDispatch>();
    const [userMail, setUserMail] = React.useState("")
    const [password, setPassword] = React.useState("")
    useEffect(() => {
        if (isAuth) {
            closeModal(false)
        }
    }, [isAuth])

    if (isLoading) {
        return (<div className='loader_cont'><span className="loader"></span><div className='overray'></div></div>)
    }
    else if (isAuth == false) {
        return (<>
            <form onSubmit={(e) => { e.preventDefault(); dispatch(fetchLogin({ user_email: userMail, password })) }}>
                <input className='input_login' type="text" placeholder='Введите почту' value={userMail} onChange={(e) => setUserMail(e.target.value)} /><br />
                <input className='input_login' type="password" placeholder='Введите пароль' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button style={{ width: "100%" }} className='header-left_btn' type='submit'>Войти</button>
                {loginEroor.response?.data ? <p style={{ color: "red" }}>{loginEroor.response?.data}</p> : null}
            </form>

        </>
        )
    }
}