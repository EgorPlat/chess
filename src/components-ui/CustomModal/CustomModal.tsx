import React, { ReactChild } from "react";
import "./CustomModal.scss";
import { createPortal } from "react-dom";

const CustomModal = (props: {
    children: ReactChild, 
    isDisplay: boolean, 
    changeModal: (status: boolean) => void
    actionConfirmed: (status: boolean) => void,
    title: string,
    typeOfActions: "default" | "none" | "custom"
    actionsComponent?: any,
}): JSX.Element | null => {


    if(!props.isDisplay) {
        return null;
    }
    return createPortal(
        <div className={"customModal"}>
            <div className={`${"customModalContent"}`}>
                <div className={"customModalTitle"}>
                    <div>{props.title}</div>
                    <div className={"customModalClose"} onClick={() => props.changeModal(false)}>
                        x
                    </div>
                </div>
                <div className={"customModalChildrenContent"}>
                    {props.children}
                </div>
                <div className={"manageCustomModal"}>
                    { 
                        props.typeOfActions === "default" 
                        &&
                        <>
                            <button className={"confirmBtn"} onClick={() => props.actionConfirmed(true)}>Подтвердить</button>
                            <button className={"cancelBtn"} onClick={() => props.changeModal(false)}>Закрыть</button>
                        </>
                    }
                    {
                        props.typeOfActions === "custom"
                        &&
                        {...props.actionsComponent}
                    }
                    {
                        props.typeOfActions === "none"
                        &&
                        null
                    }
                </div>
            </div>
        </div>
        , document.body)
}

export default CustomModal;