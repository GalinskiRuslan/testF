"use client"
import cl from './adminPage.module.css'
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { RegimeModel } from '@/models/RegimeModel';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { changeRegime, getAllRegimes } from '@/store/redusersRedux/RefimeRediser';
import { AppDispatch } from '@/store/reduxStore';
import dynamic from 'next/dynamic';

const MyEditor = dynamic(() => import('../../components/DraftEditor/DraftEditor'), {
    ssr: false
})
type ValuePiece = Date;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function AdminPanel() {
    const [visible2, setVisible2] = useState(false);
    const [dateTime, setDateTime] = useState<any>(dayjs().toDate());
    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [nutrition, setNutrition] = useState('');

    const { user, token, error, isLoading, isAuth } = useSelector<any, any>(state => state.login);
    const { isLoadingR, regimes } = useSelector<any, any>(state => state.regimes);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllRegimes());
    }, [isAuth])
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
    if (isLoading || isLoadingR) {
        return (<div className='loader_cont'><span className="loader"></span><div className='overray'></div></div>)

    }
    else if (!isAuth) {
        return <div className={cl.warningText}>Вы не авторизованы, авторизуйтесь</div>
    }
    else if (user.user_role !== 'admin') {
        {
            return (

                <section className={cl.warningText}>
                    У Вас нету прав администратора
                </section>
            )
        }
    }
    else {
        return (
            <div className={cl.admin}>
                <div className={cl.admincont}><div>День</div><div> Описание режима</div><div>Дата</div><div>Питание</div><div>Редактировать</div> </div>
                {regimes.map((item: RegimeModel) => (
                    <div className={cl.admincont} key={item.id}>
                        <div>{getDay(dayjs(item.dataTime).day())}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                        <div>{dayjs(item.dataTime).format(' DD.MM')}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.nutrition }}></div>
                        <div><button onClick={() => {
                            setDateTime(item.dataTime == null ? new Date() : dayjs(item.dataTime).toDate()); setDescription(item.description); setId(item.id); setNutrition(item.nutrition); setVisible2(true);
                        }}>Редактировать</button></div>

                    </div>
                ))}


                <Modal visible={visible2} setVisible={setVisible2}>
                    <div>Выбирете дату<Calendar onChange={setDateTime} value={dateTime} /></div>
                    <div>
                        <label>Описание режима</label>
                        <MyEditor value={description} setValue={setDescription} />
                    </div>
                    <div>
                        <label>Описание питания</label>
                        <MyEditor value={nutrition} setValue={setNutrition} />
                    </div>

                    <button onClick={() => {
                        dispatch(changeRegime({ id, dataTime: dateTime.toString(), description, isActive: true, nutrition }));
                    }
                    }>123</button>
                </Modal>
            </div>

        )
    }
}

