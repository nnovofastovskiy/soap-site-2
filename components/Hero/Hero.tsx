import { HeroProps } from "./Hero.props";
import styles from './Hero.module.css';
import InstaIcon from './instagram-icon.svg';
import cn from 'classnames';
import React from 'react';
import Link from 'next/link';
import { Button } from "..";

export const Hero = ({ className, ...props }: HeroProps): JSX.Element => {

    return (
        <div className={cn(className, styles.wrapper)}>
            <h1 className={styles.h1}>
                Натуральная косметика<br />ручной работы
            </h1>
            <Link href={'https://www.instagram.com/vasteori.cosmetics/'}>
                <a className={styles['instagram-link']}>
                    <InstaIcon />
                </a>
            </Link>
            <Button appearance={"primary"}
                className={styles['shop-btn']}
            >
                <Link href={'/shop'}>
                    <a>
                        В каталог
                    </a>
                </Link>
            </Button>
        </div>
    );
}