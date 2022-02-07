import { CartProps } from "./Cart.props";
import styles from './Cart.module.css';
import CartIcon from './cart.svg';
import { useRouter } from 'next/router';
import cn from 'classnames';
import useCart from "../../context/useCart";

export const Cart = ({ items, light = false, ...props }: CartProps): JSX.Element => {
    const { trueCart } = useCart();
    const count = trueCart?.reduce((acc, item) => {
        return acc + item.count;
    }, 0);
    return (
        <div className={cn(styles.wrapper, {
            [styles.light]: light
        })}>
            <CartIcon className={cn(styles.icon)} />
            <span className={styles.counter}>{!!count && count}</span>
        </div>
    );
};