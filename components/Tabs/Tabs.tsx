import React, { useState } from 'react'
import cl from './Tabs.module.css'

export const Tabs = ({ items }: { items: any }) => {
    const [activeTabs, setActiveTabs] = useState(0);
    return (<>
        <div className={cl.container_content}>
            {items.map((item: any, index: number) => (
                <div key={index} className={activeTabs == index ? cl.activeTabs : cl.tabs}>
                    <p className={cl.title}>{item.title}: </p>
                    {item.content}
                </div>))}


        </div>
        <div className={cl.nav}>{items.map((item: any, index: number) => (<div key={index}><button className='login_btn' style={{ margin: '10px' }} onClick={() => { setActiveTabs(index) }}>{item.buttonName}</button></div>))}</div>
    </>)
}
