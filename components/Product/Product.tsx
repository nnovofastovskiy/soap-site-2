import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import { Button, Shimmer, TextEditor } from '..';
import WishIcon from '../../icons/wish.svg';
import { AddToCart } from '../AddToCart/AddToCart';
import useCart from '../../context/useCart';
import parse from 'html-react-parser';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import RemoveIcon from "../../icons/remove.svg";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export const Product = ({ apperience, id, name, price, description = '', images, categoryId, loading = false, ...props }: ProductProps): JSX.Element => {
    const randomWidth = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    const { localCart, addToCart } = useCart();
    const [inCart, setInCart] = useState(0);
    const min = apperience == 'min';
    const full = apperience == 'full';
    const cart = apperience == 'cart';
    const [swiper, setSwiper] = useState<SwiperCore>();

    const ImgPagination = (): JSX.Element => {
        if (!loading) {
            if (images.length > 1)
                return (
                    <div
                        className={styles.pagination}
                    >
                        {swiper && images.map((img, i) => {
                            return (
                                <Image
                                    key={`pag-img-${i}`}
                                    onClick={() => swiper.slideTo(i)}
                                    src={process.env.NEXT_PUBLIC_DOMAIN + images[i].url}
                                    alt={images[i].alt}
                                    width={100}
                                    height={100}
                                    objectFit={'cover'}
                                // layout={'responsive'}
                                // priority={true}
                                />
                            );
                        })}
                    </div>
                );
            else return <></>
        }
        else return (
            <div
                className={styles.pagination}
            >
                <div className={styles['img-pagination-shimmer-wrapper']}>
                    <Shimmer className={styles['img-pagination-shimmer']} />
                </div>
                <div className={styles['img-pagination-shimmer-wrapper']}>
                    <Shimmer className={styles['img-pagination-shimmer']} />
                </div>
                <div className={styles['img-pagination-shimmer-wrapper']}>
                    <Shimmer className={styles['img-pagination-shimmer']} />
                </div>
            </div>
        )
    }

    // const contentState = convertFromRaw(JSON.parse(description));
    // const editorState = EditorState.createWithContent(contentState);

    // SwiperCore.use([Navigation, Pagination]);


    useEffect(() => {
        if (!localCart.length) setInCart(0);
        for (let i = 0; i < localCart.length; i++) {
            if (localCart[i]._id === id) {
                setInCart(localCart[i].count);
                return;
            } else {
                setInCart(0);
            }
        }
    }, [localCart, loading]);

    const imageComponent = () => {
        return (
            <>
                {(min || cart) && (loading ?
                    <div className={styles['img-shimmer-wrapper-min']}>
                        <Shimmer className={styles['img-shimmer-min']} />
                    </div> :
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + images[0].url}
                        alt={images[0].alt}
                        width={min ? 500 : 100}
                        height={min ? 300 : 100}
                        objectFit={'cover'}
                        layout={'responsive'}
                        priority={true}
                    />)
                }

                {full && (loading ?
                    <>
                        <div className={styles['img-shimmer-wrapper-full']}>
                            <div
                                className={cn(styles['img-swiper'])}
                            >
                                <Shimmer className={styles['img-shimmer-full']} />
                            </div>
                        </div>
                        <ImgPagination />
                    </>
                    :
                    <>
                        <div
                            className={cn(styles['img-swiper'])}
                        >
                            <Swiper
                                onSwiper={swiper => setSwiper(swiper)}
                                pagination={true}
                                modules={[Pagination]}
                                className={styles['swiper-wrapper']}
                            >
                                {images.map((image, i) => {
                                    return (
                                        <SwiperSlide
                                            key={`swiper-slide${i}`}
                                        >
                                            <Image
                                                src={process.env.NEXT_PUBLIC_DOMAIN + image.url}
                                                alt={image.alt}
                                                width={500}
                                                height={500}
                                                objectFit={'cover'}
                                                priority={true}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <ImgPagination />
                        </div>
                    </>
                )}
            </>
        );
    };

    return (
        <div className={cn(styles.wrapper, {
            [styles.min]: min,
            [styles.full]: full,
            [styles.cart]: cart
        })} {...props}>
            {min &&
                <>
                    <Link
                        href={{
                            pathname: '/shop/[categoryId]/[productId]',
                            query: { categoryId: categoryId, productId: id },
                        }}
                    >
                        <a className={cn(styles.link, {
                            [styles.disabled]: loading
                        })}>
                            <div className={cn(styles['img-wrapper'], styles['img-wrapper-min'])}>
                                {imageComponent()}
                                {!loading &&
                                    <Button
                                        className={styles['wish-button']}
                                        appearance={'ghost'}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <WishIcon className={styles['wish-icon']} />
                                    </Button>
                                }
                            </div>
                            <div className={cn(styles['text-wrapper'], styles['text-wrapper-min'])}>
                                {loading ?
                                    <>
                                        <h4 className={cn(styles.name, styles['name-min'])}>
                                            <Shimmer className={cn(styles.name, styles['name-shimmer'])} />
                                        </h4>
                                        <span className={cn(styles.price, styles['price-min'])}>
                                            <Shimmer className={cn(styles.price, styles['price-shimmer'])} />
                                        </span>
                                    </>
                                    :
                                    <>
                                        <h4 className={cn(styles.name, styles['name-min'])}>{name}</h4>
                                        <span className={cn(styles.price, styles['price-min'])}>{price}&nbsp;р</span>
                                    </>
                                }
                            </div>
                        </a>
                    </Link>
                    {loading ?
                        <Shimmer
                            className={cn(styles['cart-button'], styles['cart-button-min'], styles['shimmer-cart-button-min'])}
                        >
                            <span style={{
                                display: 'block',
                                height: '1rem'
                            }}>

                            </span>
                        </Shimmer>
                        :
                        <AddToCart
                            className={cn(styles['cart-button'], styles['cart-button-min'])}
                            appearance={'min'}
                            productId={id}
                            inCart={inCart}
                        />
                    }
                </>
            }


            {full &&
                <>
                    <div className={cn(styles['img-wrapper'], styles['img-wrapper-full'])}>
                        {imageComponent()}
                    </div>
                    <div className={cn(styles['text-wrapper'], styles['text-wrapper-full'])}>
                        {loading ?
                            <>
                                <h2
                                    className={cn(styles.name, styles['name-full'], `crumb-${id}`)}
                                >
                                    <Shimmer className={cn(styles.name, styles['name-shimmer'])} />
                                </h2>
                                <span
                                    className={cn(styles.price, styles['price-full'])}
                                >
                                    <Shimmer className={cn(styles.price, styles['price-shimmer'])} />
                                </span>
                                <Shimmer
                                    className={cn(styles['cart-button'], styles['cart-button-full'], styles['shimmer-cart-button-full'])}
                                >
                                    <span style={{
                                        display: 'block',
                                        height: '1rem'
                                    }}>

                                    </span>
                                </Shimmer>
                                <div
                                    className={cn(styles.description, styles['description-full'])}
                                >
                                    {new Array(14).fill(0).map((item, i) => {
                                        return (
                                            <Shimmer
                                                key={`p-shimmer-${i}`}
                                                className={styles['shimmer-description-full']}
                                                tag={'p'}
                                                style={{ width: `${randomWidth(15, 85)}%` }}
                                            />
                                        );
                                    })}
                                </div>
                            </>
                            :
                            <>
                                <h2
                                    className={cn(styles.name, styles['name-full'], `crumb-${id}`)}
                                >
                                    {name}
                                </h2>
                                <span
                                    className={cn(styles.price, styles['price-full'])}
                                >
                                    {price}&nbsp;р
                                </span>
                                <AddToCart
                                    className={cn(styles['cart-button'], styles['cart-button-full'])}
                                    appearance={'min'}
                                    productId={id}
                                    inCart={inCart}
                                />
                                <div
                                    className={cn(styles.description, styles['description-full'])}
                                >
                                    {parse(description)}
                                    {/* <TextEditor description={description} /> */}
                                </div>
                            </>
                        }

                    </div>
                </>
            }

            {
                cart &&
                <>
                    <>
                        <Link
                            href={{
                                pathname: '/shop/[categoryId]/[productId]',
                                query: { categoryId: categoryId, productId: id },
                            }}
                        >
                            <a className={cn(styles.link, {
                                [styles.disabled]: loading
                            })}>
                                <div className={cn(styles['img-wrapper'], styles['img-wrapper-cart'])}>
                                    {imageComponent()}
                                </div>
                                <div className={cn(styles['text-wrapper'], styles['text-wrapper-cart'])}>
                                    {loading ?
                                        <>
                                            <h4 className={cn(styles.name, styles['name-cart'])}>
                                                <Shimmer className={cn(styles.name, styles['name-shimmer'])} />
                                            </h4>
                                            <span className={cn(styles.price, styles['price-cart'])}>
                                                <Shimmer className={cn(styles.price, styles['price-shimmer'])} />
                                            </span>
                                            <Shimmer
                                                className={cn(styles['cart-button'], styles['cart-button-cart'], styles['shimmer-cart-button-cart'])}
                                            >
                                                <span style={{
                                                    display: 'block',
                                                    height: '1rem'
                                                }}>

                                                </span>
                                            </Shimmer>
                                        </>
                                        :
                                        <>
                                            <h4 className={cn(styles.name, styles['name-cart'])}>{name}</h4>
                                            <div>
                                                <AddToCart
                                                    className={cn(styles['cart-button'], styles['cart-button-cart'])}
                                                    appearance={'cart'}
                                                    productId={id}
                                                    inCart={inCart}
                                                />
                                                <span className={cn(styles.price, styles['price-cart'])}>{price}&nbsp;р</span>
                                            </div>
                                        </>
                                    }
                                </div>
                            </a>
                        </Link>
                        {/* {loading ?
                            <Shimmer
                                className={cn(styles['cart-button'], styles['cart-button-cart'], styles['shimmer-cart-button-cart'])}
                            >
                                <span style={{
                                    display: 'block',
                                    height: '1rem'
                                }}>

                                </span>
                            </Shimmer>
                            :
                            <AddToCart
                                className={cn(styles['cart-button'], styles['cart-button-cart'])}
                                appearance={'cart'}
                                productId={id}
                                inCart={inCart}
                            />
                        } */}
                    </>
                </>
            }
        </div >
    );
};