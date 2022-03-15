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
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

export const Product = ({ apperience, id, name, price, description, images, categoryId, loading = false, ...props }: ProductProps): JSX.Element => {
    const { localCart } = useCart();
    const [imageNumber, setImageNumber] = useState(0);
    const [inCart, setInCart] = useState(0);
    const min = apperience == 'min';
    const full = apperience == 'full';
    const cart = apperience == 'cart';

    // const contentState = convertFromRaw(JSON.parse(description));
    // const editorState = EditorState.createWithContent(contentState);

    // SwiperCore.use([Navigation, Pagination]);

    useEffect(() => {
        if (!localCart.length) setInCart(0);
        for (let i = 0; i < localCart.length; i++) {
            if (localCart[i].productId === id) {
                setInCart(localCart[i].count);
                return;
            } else {
                setInCart(0);
            }
        }
    }, [localCart]);

    const imageComponent = () => {
        return (
            <>
                {min && (loading ?
                    <div className={styles['img-shimmer-wrapper']}>
                        <Shimmer className={styles['img-shimmer']} />
                    </div> :
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + images[0].url}
                        alt={images[0].alt}
                        width={500}
                        height={300}
                        objectFit={'cover'}
                        layout={'responsive'}
                        priority={true}
                    />)
                }

                {full &&
                    <>
                        <div>
                            {/* <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                navigation
                                pagination
                            >
                                {images.map(image => {
                                    return (
                                        <SwiperSlide
                                            key={image}
                                        >
                                            <Image
                                                src={image}
                                                width={(min) ? 500 : (full) ? 500 : 300}
                                                height={(min) ? 300 : (full) ? 500 : 300}
                                                objectFit={'cover'}
                                                priority={true}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper> */}
                            <Image
                                src={process.env.NEXT_PUBLIC_DOMAIN + images[imageNumber].url}
                                alt={images[imageNumber].alt}
                                width={500}
                                height={500}
                                objectFit={'cover'}
                                priority={true}
                            />
                        </div>
                        <div className={styles['image-minies']}>
                            {images.map((image, i) => {
                                return (
                                    <Image
                                        className={cn(styles['image-mini'], {
                                            [styles['image-minies-active']]: imageNumber == i
                                        })}
                                        key={`imageProduct-${i}`}
                                        src={process.env.NEXT_PUBLIC_DOMAIN + image.url}
                                        alt={image.alt}
                                        width={100}
                                        height={100}
                                        objectFit={'cover'}
                                        onClick={() => setImageNumber(i)}
                                    />);
                            })}
                        </div>
                    </>
                }

                {cart &&
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + images[0].url}
                        alt={images[0].alt}
                        width={100}
                        height={100}
                        objectFit={'cover'}
                        priority={true}
                    />
                }
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
                    </div>
                </>
            }

            {
                cart &&
                <>
                    <div className={cn(styles['img-wrapper'], styles['img-wrapper-cart'])}>
                        {imageComponent()}
                    </div>
                    <div className={cn(styles['text-wrapper'], styles['text-wrapper-cart'])}>
                        <h2
                            className={cn(styles.name, styles['name-cart'])}
                        >
                            {name}
                        </h2>
                        <span
                            className={cn(styles.price, styles['price-cart'])}
                        >
                            {price}&nbsp;р
                        </span>
                        <AddToCart
                            className={cn(styles['cart-button'], styles['cart-button-cart'])}
                            appearance={'min'}
                            productId={id}
                            inCart={inCart}
                        />
                        {/* <div
                            className={cn(styles.description, styles['description-cart'])}
                        >
                            {parse(description)}
                        </div> */}
                    </div>
                </>
            }
        </div >
    );
};