import { ButtonProps } from "./Button.props";
import styles from './Button.module.css';
import cn from 'classnames';
import { useState } from "react";
import { motion } from "framer-motion";
import { Spinner } from "..";

export const Button = ({ appearance, children, foo, loading, proove, iconSvg, className, ...props }: ButtonProps): JSX.Element => {
    const [init, setInit] = useState(false);
    const [process, setProcess] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();

    const resetInit = () => {
        setInit(false);
    };

    const loadingFoo = () => {
        setProcess(true);
        foo?.();
    };

    const prooveFoo = () => {
        if (init) {
            if (timerId) clearTimeout(timerId);
            setInit(false);
            setProcess(true);
            foo?.().then((res) => {
                if (res) setProcess(false);
                // if (res === 'ok') {
                // }
            });
        } else {
            setInit(true);
            const timerId = setTimeout(resetInit, 2000);
            setTimerId(timerId);
        }
    };

    const variants = {
        init: {
            width: '100%'
        },
        default: {
            width: 0
        }
    };


    return (
        <button className={cn(className, styles.button, {
            [styles.primary]: appearance == 'primary',
            [styles.secondary]: appearance == 'secondary',
            [styles.ghost]: appearance == 'ghost',
        })}
            onClick={(foo && proove) ? prooveFoo : (foo && loading) ? loadingFoo : foo}
            disabled={process}
            {...props}
        >
            <motion.div
                className={cn(styles.init)}
                initial={{ width: 0 }}
                // animate={init ? { width: '100%' } : { width: 0 }}
                variants={variants}
                animate={init ? variants.init : variants.default}
                transition={init ? { duration: 2 } : { duration: 0 }}
            >

            </motion.div>
            {loading && process ? <Spinner /> : iconSvg}
            {children}
        </button>
    );
};