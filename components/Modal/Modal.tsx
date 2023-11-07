'use client'
import React, { useContext } from "react";
import cl from "./Modal.module.css";
import { type } from "os";



type Props = {
    children: React.ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ children, visible, setVisible }: Props) => {
    const rootClasses = [cl.modal];

    if (visible) {
        rootClasses.push(cl.active);
        /*   document.body.style.overflow = "hidden"; */
    } else {
        /*   document.body.style.overflow = "auto"; */
    }
    return (
        <div className={rootClasses.join(" ")} onClick={() => { setVisible(false) }}>
            <div className={cl.content} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
export default Modal;