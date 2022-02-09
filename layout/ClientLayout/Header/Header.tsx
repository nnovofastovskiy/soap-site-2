import { HeaderProps } from "./Header.props";
import styles from './Header.module.css';
import Link from 'next/link';
import cn from 'classnames';
import { Burger, Logo, Cart, HeaderLink, Button } from '../../../components';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { IHeaderItem } from "../../../interfaces/menuItem.interface";

const headerItems: IHeaderItem[] = [
    // {
    //     name: 'Блог',
    //     href: '/',
    //     place: 'burger'
    // },
    {
        name: 'Магазин',
        href: '/shop',
        place: 'left',
        priority: 1
    },
    {
        name: 'О нас',
        href: '/about',
        place: 'left',
        priority: 2
    },
    {
        name: 'Доставка',
        href: '/delivery',
        place: 'right',
        priority: 1
    },
    {
        name: 'Контакты',
        href: '/contacts',
        place: 'right',
        priority: 2
    },
    {
        name: 'Сотрудничество',
        href: '/',
        place: 'burger'
    },
    {
        name: 'Сертификаты',
        href: '/',
        place: 'burger'
    },
    {
        name: 'Вопросы и ответы',
        href: '/',
        place: 'burger'
    },
];

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    // const [width, setWidth] = useState<number>();
    // const [headerItems, setHeaderItems] = useState<IHeaderItem[]>(initHeaderItems);
    const route = useRouter();

    // useEffect(() => {
    //     const getWidth = () => {
    //         setWidth(window.innerWidth);

    //         if (window.innerWidth! <= 768) {
    //             const items: IHeaderItem[] = headerItems.map(item => {
    //                 if (item.priority == 1) {
    //                     item.place = 'burger';
    //                     return item;
    //                 }
    //                 return item;
    //             });
    //             setHeaderItems(items);
    //         }

    //         if (window.innerWidth! <= 425) {
    //             const items: IBurgerItem[] = headerItems.map(item => {
    //                 if (item.priority == 0) {
    //                     item.place = 'burger';
    //                     return item;
    //                 }
    //                 return item;
    //             });
    //             setHeaderItems(items);
    //         }

    //     };
    //     window.onload = getWidth;
    //     window.onresize = getWidth;
    // }, []);

    return (
        <nav
            className={cn(className, styles.header, {
                [styles.light]: route.route == '/'
            })}
            {...props}
        >
            <ul className={styles['main-menu']}>
                {/* <li>
                    <Burger items={headerItems} light={route.route == '/'} />
                </li> */}
                <ul className={styles['main-menu']}>
                    <ul className={styles['main-menu-left']}>
                        {headerItems

                            .filter(item => item.place == 'left')
                            .map((item, i) => {
                                return (
                                    <li
                                        className={item.priority ? styles[`priority-${item.priority}`] : ''}
                                        key={`left-${i}`}
                                    >
                                        <HeaderLink
                                            light={route.route == '/'}
                                            href={item.href}
                                            isActive={route.route.includes(item.href)}
                                        >
                                            {item.name}
                                        </HeaderLink>
                                    </li>
                                );
                            })
                        }
                    </ul>

                    <li className={styles['main-menu-logo']}>
                        <Link href={'/'}>
                            <a className={cn(styles.logo, {
                                [styles['light-logo']]: route.route == '/'
                            })}>
                                <Logo light={route.route == '/'} />
                            </a>
                        </Link>
                    </li>

                    <ul className={styles['main-menu-right']}>
                        {headerItems
                            .filter(item => item.place == 'right')
                            .map((item, i) => {
                                return (
                                    <li
                                        className={item.priority ? styles[`priority-${item.priority}`] : ''}
                                        key={`right-${i}`}
                                    >
                                        <HeaderLink
                                            light={route.route == '/'}
                                            href={item.href}
                                            isActive={route.route.includes(item.href)}
                                        >
                                            {item.name}
                                        </HeaderLink>
                                    </li>
                                );
                            })
                        }
                    </ul>

                </ul>
                {/* <li>
                    <Link href={'/cart'}><a><Cart items={26} light={route.route == '/'} /></a></Link>
                </li> */}
                <li
                    className={styles.burger}
                >
                    <Burger
                        items={headerItems}
                        light={route.route == '/'}
                    />
                </li>
            </ul>
        </nav>
    );
};