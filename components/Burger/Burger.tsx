import { BurgerProps } from "./Burger.props";
import styles from './Burger.module.css';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from "../../context/useAuth";
import { LoginForm, Popup, RegistrationForm, Tab } from "..";
import { TabItemInterfase } from "../Tab/Tab.props";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

export const Burger = ({ light = false, items }: BurgerProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const burgerRef = useRef(null);

    const [focus, setFocus] = useState(false);

    const burgerFocus = () => {
        setFocus(true);
    };

    const burgerBlur = () => {
        setFocus(false);
    };

    return (
        <>
            <div tabIndex={0} className={styles.wrapper} ref={burgerRef}>
                <button
                    className={cn(styles.burger, {
                        [styles.light]: light,
                        [styles.close]: isOpen
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </button>

                {isOpen &&
                    <ul
                        className={cn(styles['burger-menu'], {
                            [styles.focus]: focus,
                            [styles.light]: light,
                            [styles.background]: !light
                        })}
                    >

                        {items.map((item, i) => {
                            return (
                                <li
                                    className={item.priority == 1 ? styles['priority-1'] : item.priority == 0 ? styles['priority-0'] : ''}
                                    key={`burger-item-${i}`}
                                >
                                    <Link href={item.href}>
                                        <a onFocus={burgerFocus} onBlur={burgerBlur}>
                                            {item.name}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}

                    </ul>
                }
            </div>
        </>
    );
};