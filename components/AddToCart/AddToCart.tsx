import { AddToCartProps } from "./AddToCart.props";
import styles from './AddToCart.module.css';
import buttonStyles from '../Button/Button.module.css';
import cn from 'classnames';
import CartIcon from './cart.svg';
import React, { useEffect, useState } from "react";
import { Button, Loading } from "..";
import useCart from "../../context/useCart";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export const AddToCart = ({ appearance, productId, inCart, className, ...props }: AddToCartProps): JSX.Element => {
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);
    const [initAnimation, setInitAnimation] = useState(false);

    useEffect(() => {
        setInitAnimation(false);
    }, []);

    const addProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, count: number) => {
        setInitAnimation(true);
        setAdding(true);
        e.preventDefault();
        const data = addToCart(productId, count);
        // addToCart(productId, count);
        // console.log(data);

        if (data) {
            setAdding(false);
        }
    };

    return (
        <div className={cn(className, styles.wrapper)}>
            <AnimatePresence>
                {!!inCart &&
                    <motion.div
                        key='add'
                        className={styles.add}
                        initial={initAnimation && { width: 0 }}
                        animate={{ width: 'auto' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Button
                            className={styles['dec-btn']}
                            // style={{ width: '30px' }}
                            appearance={"secondary"}
                            disabled={inCart <= 0 || productId === '' || adding}
                            onClick={(e) => { !adding && addProduct(e, -1); }}
                        >
                            -
                        </Button>
                        <span className={styles['in-cart']}>{inCart}</span>
                        <Button
                            className={styles['inc-btn']}
                            // style={{ width: '30px' }}
                            appearance={"secondary"}
                            disabled={productId === '' || adding}
                            onClick={(e) => { !adding && addProduct(e, 1); }}
                        >
                            +
                        </Button>
                    </motion.div>
                }
                {appearance !== 'cart' && (!inCart ?
                    <Button
                        disabled={!!inCart || productId === '' || adding}
                        className={cn(styles['cart-button'], {
                            [styles['cart-button-done']]: !!inCart
                        })}
                        appearance={"primary"}
                        onClick={(e) => { addProduct(e, 1); }}
                    >
                        {adding ? 'Добавление...' : !inCart ? 'Добавить в корзину' :
                            <></>}
                    </Button> :
                    <Link
                        href={{ pathname: '/cart' }}
                    >
                        <a className={cn(buttonStyles.button, styles['cart-button-done'], styles['cart-link'])}>
                            В корзине
                        </a>
                    </Link>)

                }

            </AnimatePresence>
        </div>

    );
};