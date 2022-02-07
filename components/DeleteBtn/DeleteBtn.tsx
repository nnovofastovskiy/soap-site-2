import { DeleteBtnProps } from "./DeleteBtn.props";
import styles from './DeleteBtn.module.css';
import cn from 'classnames';
import TrashIcon from './Trash.svg';
import LoadingIcon from '../images/Loading.svg';
import { useState } from "react";
import { Button, Spinner } from "..";
import { motion } from "framer-motion";

export const DeleteBtn = ({ deleteFn, className, ...props }: DeleteBtnProps): JSX.Element => {
    const [init, setInit] = useState(false);
    const [process, setProcess] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();

    const resetInit = () => {
        setInit(false);
    };

    const deleteItem = () => {
        if (init) {
            if (timerId) clearTimeout(timerId);
            setInit(false);
            setProcess(true);
            deleteFn();
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
        <Button
            appearance="ghost"
            className={cn(className, styles.button)}
            onClick={deleteItem}
            disabled={process}
            {...props}
        >
            {process ? <Spinner /> : <TrashIcon />}
            <motion.div
                initial={{ width: 0 }}
                // animate={init ? { width: '100%' } : { width: 0 }}
                variants={variants}
                animate={init ? variants.init : variants.default}
                transition={init ? { duration: 2 } : { duration: 0 }}
                className={cn(styles.init)}
            >

            </motion.div>
        </Button>
    );
};