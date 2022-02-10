import { PopupProps } from "./Popup.props";
import styles from './Popup.module.css';
import { FunctionComponent, useEffect, useState } from 'react';
import useAuth from "../../context/useAuth";
import { Button } from "..";

export const Popup = ({ header, children, id }: PopupProps): JSX.Element => {
    const { popupActive, setPopupActive } = useAuth();
    const [body, setBody] = useState<HTMLBodyElement | null>();
    useEffect(() => {
        const body = document.querySelector('body');
        setBody(body);
    }, []);

    useEffect(() => {
        if (popupActive.isOpen) {
            body?.classList.add(styles.blocked);
        } else {
            body?.classList.remove(styles.blocked);
        }
    }, [popupActive.isOpen]);

    return (
        <>
            {popupActive.isOpen && popupActive.id == id &&
                <div className={styles.wrapper} onClick={e => {
                    setPopupActive({ isOpen: false, id: id });
                    e.stopPropagation();
                }}
                >
                    <div
                        className={styles.content}
                        onClick={e => e.stopPropagation()}
                    >
                        <div
                            className={styles.header}
                        >
                            {header}
                            <Button
                                appearance="ghost"
                                className={styles['close-btn']}
                                onClick={() => setPopupActive({ isOpen: false, id: id })}
                            >
                                <div className={styles['close-icon']}>
                                    <div></div>
                                    <div></div>
                                </div>
                            </Button>
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

// export const withPopup = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
//     return function withPopupComponent(props: T): JSX.Element {
//         return (
//             <Popup>
//                 <Component {...props} />
//             </Popup>
//         );
//     };
// };
