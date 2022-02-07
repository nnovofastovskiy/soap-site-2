import { TabProps } from "./Tab.props";
import styles from './Tab.module.css';
import cn from 'classnames';
import { motion, AnimateSharedLayout } from "framer-motion";
import React, { KeyboardEventHandler } from "react";

export const Tab = ({ withBtn, items, changeHandler, activeIndex = 0 }: TabProps): JSX.Element => {

    // const []

    const keyChange = (e: React.KeyboardEvent<HTMLLIElement>, index: number) => {
        if (e.code == "Enter") {
            changeHandler(index);
        }
    };

    return (
        <AnimateSharedLayout>
            <ul className={styles.wrapper}>
                {items.map((item, index) => {
                    return (
                        <li
                            className={styles.item}
                            key={index}
                            onClick={() => changeHandler(index)}
                            onKeyDown={(e) => keyChange(e, index)}
                            tabIndex={0}
                        >
                            <span>{item.text}</span>
                            {withBtn && <div className={styles.button} onClick={() => item.toggleBtnFunction()}>{item.toggleState ? '-' : "+"}</div>}
                            {activeIndex == index && <ActiveLine />}
                        </li>
                    );
                })}
            </ul>
        </AnimateSharedLayout>
    );
};

const ActiveLine = () => {
    return (
        <motion.div
            className={styles.active}
            layoutId={"ActiveItem"}
            transition={{
                type: "spring",
                duration: 0.2,
                // damping: 10,
                // stiffness: 100
            }}
        >

        </motion.div>
    );
};