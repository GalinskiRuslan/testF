"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '../Modal/Modal'
import { Tabs } from '../Tabs/Tabs'
import { InnerForm } from '../CustomComponents/InnerForm'
import { RegisterForm } from '../CustomComponents/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { clear, fetchCheckLogin } from '@/store/redusersRedux/loginReduser'
import { AppDispatch } from '@/store/reduxStore'


export const Header = () => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const { user, token, error, isLoading, isAuth, loginEroor } = useSelector<any, any>(state => state.login);
    const [menuToggler, setMenuToggler] = useState(false);

    useEffect(() => {
        dispatch(fetchCheckLogin());
        console.log(user, token, error, isLoading);

    }, [isAuth])

    return (
        <div className='header'>
            <nav className={menuToggler ? 'active' : ''}>
                <ul>
                    <a href='#'><li>О нас</li></a>
                    <a href='#'><li>Выбор режима</li></a>
                    <a href='#'><li>Выбор питания</li></a>
                    <a href='#'><li>Для родителей</li></a>
                </ul>
            </nav>
            <div className='logo'><a href='/'><Image src="/mainlogo.png" alt="Logo" width={74} height={72} /></a></div>
            {!isAuth ? <button className="login_btn" onClick={() => setVisible(true)}>Войти</button> : <button className="login_btn" onClick={() => dispatch(clear())}>выйти</button>}

            <button className="header-left_btn">подать заявку!</button>
            <button onClick={() => setMenuToggler(!menuToggler)} className="menu_btn"><span className="menu_btn_span"></span></button>


            <Modal visible={visible} setVisible={setVisible} >
                <Tabs items={[{
                    title: "Вход", content: <InnerForm closeModal={setVisible} />, buttonName: "Вход"
                }, {
                    title: "Регистрация", content: <RegisterForm closeModal={setVisible} />, buttonName: "Регистрация"
                },]} />
            </Modal>
        </div>
    )
}
