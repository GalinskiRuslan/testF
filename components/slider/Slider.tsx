"use client"
import React, { useRef, useState } from 'react'
import cl from './Slider.module.css'

export const Slider = ({ items }: { items: any }) => {
    const [sliderWidth, setSliderWidth] = React.useState(0);
    const selectedRef = useRef<any>(null);
    const [index, setIndex] = useState(0);

    const moveRight = () => {
        if (index < items.length - 1) {
            setIndex(index + 1);
        }
        else if (index === items.length - 1) {
            setIndex(0);
        }
    }
    const moveLeft = () => {
        if (index === 0) {
            setIndex(items.length - 1);
        }
        else {
            setIndex(index - 1);
        }
    }
    const classTriger = (i: number) => {
        if (index === i) {
            return cl.slider_item_active;
        }
        if (index === i + 1 && index !== items.length - 1) {
            return cl.slider_item_prev;
        }
        if (index === i - 1 && index !== 0) {
            return cl.slider_item_next;
        }
        if (index === 0 && i === items.length - 1) {
            return cl.slider_item_prev;
        }
        if (index === 0 && i === index + 1) {
            return cl.slider_item_next;
        }
        if (index === items.length - 1 && i === 0) {
            return cl.slider_item_next;
        }
        if (index === items.length - 1 && i === index - 1) {
            return cl.slider_item_prev;
        }
        if (index !== i && index !== i - 1 && index > i) {
            return cl.slider_item_left;
        }
        if (index !== i && index !== i + 1 && index < i) {
            return cl.slider_item_right;
        }
    }
    return (
        <div className={cl.slider} onTouchMove={(e) => console.log(e)
        }>
            <div className={cl.slide_line} style={{ width: `calc(100% * (${items.length}/3))` }}>
                {items.map((item: any, i: number) => (
                    <div key={i} className={classTriger(i)} >
                        {item}
                    </div>

                ))}
            </div><button className={cl.arrowright} onClick={() => {
                moveRight();
            }}><svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                    <path d="M30 0.940918C13.4575 0.940918 0 14.3984 0 30.9409C0 47.4835 13.4575 60.9409 30 60.9409C46.5425 60.9409 60 47.4835 60 30.9409C60 14.3984 46.5425 0.940918 30 0.940918ZM39.2675 32.7085L26.7675 45.2084C26.28 45.6959 25.64 45.9409 25 45.9409C24.36 45.9409 23.7199 45.6959 23.2324 45.2084C22.255 44.2309 22.255 42.6509 23.2324 41.6734L33.965 30.9409L23.2325 20.2084C22.2551 19.231 22.2551 17.6509 23.2325 16.6735C24.21 15.696 25.79 15.696 26.7675 16.6735L39.2675 29.1735C40.245 30.151 40.245 31.7309 39.2675 32.7085Z" fill="#C8D565" />
                </svg></button>
            <button className={cl.arrowleft} onClick={() => moveLeft()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                    <path d="M30 60.9409C46.5425 60.9409 60 47.4835 60 30.9409C60 14.3984 46.5425 0.940919 30 0.940921C13.4575 0.940922 -4.06888e-06 14.3984 -2.62268e-06 30.9409C-1.17649e-06 47.4835 13.4575 60.9409 30 60.9409ZM20.7325 29.1734L33.2325 16.6735C33.72 16.186 34.36 15.9409 35 15.9409C35.64 15.9409 36.2801 16.186 36.7676 16.6735C37.745 17.6509 37.745 19.231 36.7676 20.2084L26.035 30.9409L36.7675 41.6734C37.7449 42.6509 37.7449 44.2309 36.7675 45.2084C35.79 46.1858 34.21 46.1858 33.2325 45.2084L20.7325 32.7083C19.755 31.7309 19.755 30.151 20.7325 29.1734Z" fill="#C8D565" />
                </svg>
            </button>
        </ div>
    )
}
