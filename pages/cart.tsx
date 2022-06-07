import { withLayout } from '../layout/ClientLayout/Layout';
import styles from '../styles/CartPage.module.css';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useCart from '../context/useCart';
import { AddToCart, Button, Product } from '../components';
import Image from 'next/image';
import Link from 'next/link';

const Cart: NextPage = () => {
    const [loading, setLoading] = useState(true);
    const { localCart, fullPrice, clearCart, refresh, addToCart } = useCart();

    useEffect(() => {
        const cart = refresh().then(
            (data) => {
                if (data)
                    setLoading(false);
            }
        );
    }, []);


    return (
        <main>
            <Button
                appearance={'primary'}
                foo={clearCart}
                proove={true}
                disabled={localCart.length == 0}
            >
                Очистить корзину
            </Button>
            <section className={styles['cart-wrapper']}>
                {/* <span>Продукт</span>
                <span>Цена</span>
                <span>Количество</span>
                <span>Сумма</span> */}

                {!localCart ? 'loading...' :
                    localCart.map((prod, i) => {
                        return (
                            <Product
                                apperience={'cart'}
                                id={prod._id}
                                name={prod.name ? prod.name : ''}
                                price={prod.price ? prod.price : 0}
                                images={prod.images ? prod.images : []}
                                categoryId={prod.collectionId ? prod.collectionId : ''}
                                loading={loading}
                            />
                        );
                    })
                }

            </section>
            fullPrice
            {fullPrice}
        </main >
    );
};

export default withLayout(Cart);