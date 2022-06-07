import { CartProps } from "./Cart.props";
import styles from './Cart.module.css';
import CartIcon from './cart.svg';
import CartEmptyIcon from './cart-empty.svg';
import CartFullIcon from './cart-full.svg';
import { useRouter } from 'next/router';
import cn from 'classnames';
import useCart from "../../context/useCart";

const limit = 10;

export const Cart = ({ items, light = false, ...props }: CartProps): JSX.Element => {
    const { localCart, fullCount } = useCart();
    // const count = fullCart?.reduce((acc, item) => {
    //     if (item.isActive)
    //         return acc + item.count;
    //     else
    //         return acc
    // }, 0);
    return (
        <div className={cn(styles.wrapper, {
            // [styles.light]: light
        })}>
            {fullCount == 0 ? <CartEmptyIcon className={cn(styles.icon)} /> :
                <CartFullIcon className={cn(styles.icon)} />}
            <span className={styles.counter}>{fullCount > 0 ? fullCount <= limit ? fullCount : `${limit}+` : ''}</span>
        </div>
    );
};