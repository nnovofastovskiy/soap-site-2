import { withLayout } from '../layout/ClientLayout/Layout';
import styles from '../styles/CartPage.module.css';
import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useCart from '../context/useCart';
import { API } from '../helpers/api';
import { ICartItem, IFullCart } from '../interfaces/cart.interface';
import { IProduct } from '../interfaces/catalog.interface';
import { AddToCart, Button, Product } from '../components';
import Image from 'next/image';
import Link from 'next/link';

const Cart: NextPage = () => {
    // const [fullCart, setFullCart] = useState<IFullCart[]>();
    // const [fullPrice, setFullPrice] = useState<number>();
    const { localCart, fullCart, fullPrice, clearCart } = useCart();

    // useEffect(() => {
    // getCSRFToken().then(() => {
    // getFullCart();
    // });
    // }, [localCart]);

    // const getCSRFToken = async () => {
    //     const { data } = await axios.get<{ csrfToken: string }>(API.auth.getCSRFToken);
    //     axios.defaults.headers.post["X-XSRF-TOKEN"] = data.csrfToken;
    // };

    // const getFullCart = async () => {
    //     const cartProducts = localCart.map(item => item.productId);
    //     const arrIds = {
    //         arrIds: cartProducts
    //     };

    //     const { data } = await axios.post<IProduct[]>(API.products.getByArrIds, arrIds);

    //     const fullCart: IFullCart[] = data.map(productItem => {
    //         const count = localCart.filter(сartItem => сartItem.productId === productItem._id)[0].count;
    //         const fullItem: IFullCart = { ...productItem, count: count };
    //         return fullItem;
    //     });
    //     setFullCart(fullCart);
    //     getFullPrice(fullCart);
    // };

    // const getFullPrice = (cart: IFullCart[]) => {
    //     let fullPrice = 0;
    //     const activeProducts = cart.filter(item => { if (item.isActive) return item });
    //     activeProducts.forEach(item => {
    //         fullPrice += item.price * item.count;
    //     });
    //     setFullPrice(fullPrice);
    // };

    // const clearCart = async () => {
    //     try {
    //         console.log('clearCart');

    //         return "ok";
    //     } catch (error) {

    //     }
    // };

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
            <pre>{localCart.length}</pre>
            <section className={styles['cart-wrapper']}>
                {/* <div className={styles['cart-header']}></div> */}
                {/* <span>Фото</span> */}
                <span>Продукт</span>
                <span>Цена</span>
                <span>Количество</span>
                <span>Сумма</span>

                {!fullCart ? 'loading...' :
                    fullCart.map((prod, i) => {
                        return (
                            <>
                                <Link
                                    key={`link-${i}`}
                                    href={{
                                        pathname: '/shop/[category]/[product]',
                                        query: { category: prod.collectionId, product: prod._id }
                                    }}
                                >
                                    <a
                                        key={`wrapper-${i}`}
                                        className={styles['link-wrapper']}
                                    >
                                        <Image
                                            key={`image-${i}`}
                                            src={process.env.NEXT_PUBLIC_DOMAIN + prod.images[0].url}
                                            alt={prod.images[0].alt}
                                            width={100}
                                            height={100}
                                            objectFit={'cover'}
                                            priority={true}
                                        />
                                        <div
                                            key={`text-${i}`}
                                        >
                                            <h5
                                                key={`name-${i}`}
                                                className={styles['product-name']}
                                            >
                                                {prod.name}
                                            </h5>
                                            <p
                                                key={`description-${i}`}
                                                className={styles['product-nadescriptionme']}
                                            >
                                                {prod.description.slice(0, 30)}...
                                            </p>
                                        </div>
                                    </a>
                                </Link>

                                <span
                                    key={`price-${i}`}
                                    className={styles['product-price']}
                                >
                                    {prod.price}&nbsp;р
                                </span>
                                {prod.isActive ?
                                    <>
                                        <AddToCart
                                            key={`addToCart-${i}`}
                                            appearance={'cart'}
                                            productId={prod._id}
                                            inCart={prod.count}
                                        />
                                        <span
                                            key={`sum-${i}`}
                                            className={styles['product-sum']}
                                        >
                                            {prod.price * prod.count}&nbsp;р
                                        </span>
                                    </>
                                    :
                                    <>
                                        <span
                                            key={`sum-${i}`}
                                        >Данный товар недоступен</span>
                                        <span></span>
                                    </>
                                }


                            </>
                        );
                    })
                }

            </section>
            {/* cart
            <pre>{JSON.stringify(localCart, null, 4)}</pre>
            <hr />
            fullCart
            <pre>{JSON.stringify(fullCart, null, 4)}</pre>
            <hr />
            fullPrice
            {fullPrice} */}
        </main >
    );
};

export default withLayout(Cart);