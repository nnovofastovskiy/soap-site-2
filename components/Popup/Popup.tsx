import { PopupProps } from "./Popup.props";
import styles from './Popup.module.css';
import { FunctionComponent } from 'react';
import useAuth from "../../context/useAuth";
import { Button } from "..";

export const Popup = ({ header, children, id }: PopupProps): JSX.Element => {
    const { popupActive, setPopupActive } = useAuth();
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
