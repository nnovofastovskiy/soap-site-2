import { BurgerProps } from "./Burger.props";
import styles from './Burger.module.css';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
                                    className={item.priority ? styles[`priority-${item.priority}`] : ''}
                                    key={`burger-item-${i}`}
                                >
                                    <Link href={item.href}>
                                        <a
                                            className={styles.href}
                                            onFocus={burgerFocus}
                                            onBlur={burgerBlur}
                                        >
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