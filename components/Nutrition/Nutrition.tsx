"use client"
import { RegimeModel } from '@/models/RegimeModel';
import React, { useEffect } from 'react'
import cl from "./Nutrition.module.css"
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/reduxStore';
import { getAllRegimes } from '@/store/redusersRedux/RefimeRediser';

export const Nutrition = () => {
    const { isLoading, isAuth } = useSelector<any, any>(state => state.login);
    const { isLoadingR, regimes } = useSelector<any, any>(state => state.regimes);
    const getDay = (date: number) => {
        switch (date) {
            case 1: { return "Понидельник"; break }
            case 2: { return "Вторник"; break }
            case 3: { return "Среда"; break }
            case 4: { return "Четверг"; break }
            case 5: { return "Пятница"; break }
            case 6: { return "Суббота"; break }
            case 0: { return "воскресенье"; break }
        }
    }
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllRegimes());
    }, [isAuth])
    if (!isAuth) {
        return (
            <div className={cl.regime_unautaraiz}>
                <h1>ВЫ НЕ АВТОРИЗОВАНЫ</h1>
                <p>Авторизуйтесь чтобы посмотреть режимы</p>
            </div>
        )
    }

    return (
        <div className={cl.regimeList}>
            {regimes.map((regime: RegimeModel) =>
                <div key={regime.id} className={cl.item_card}>
                    <div className={cl.dataTime}>{dayjs(regime.dataTime).format("DD.MM")}</div>
                    <div>
                        <div className={cl.day}>{getDay(dayjs(regime.dataTime).day())}</div>
                        <div className={cl.descr} dangerouslySetInnerHTML={{ __html: regime.nutrition }}></div>
                    </div>
                </div>)}
        </div>
    )
}
