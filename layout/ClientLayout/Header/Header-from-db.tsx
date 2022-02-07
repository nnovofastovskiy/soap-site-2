import { HeaderProps } from "./Header.props";
import styles from './Header.module.css';
import Link from 'next/link';
import cn from 'classnames';
import { Logo, Cart, HeaderLink } from '../../components';
import { useRouter } from 'next/router';
import { ItemInterface, MenuItemInterface } from '../../interfaces/menuItem.interface';
import { useEffect, useState } from 'react';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
    const [menu, setMenu] = useState<MenuItemInterface[]>([]);

    useEffect(() => {
        setMenu(menuItems);
    }, []);
    const route = useRouter();
    const menuItems: MenuItemInterface[] = [
        {
            name: 'Магазин',
            href: '/shop',
            type: 'main',
            priority: true,
            place: 'left'
        },
        {
            name: 'О нас',
            href: '/about',
            type: 'main',
            priority: false,
            place: 'left'
        },
        {
            name: 'Доставка',
            href: '/delivery',
            type: 'main',
            priority: false,
            place: 'right'
        },
        {
            name: 'Контакты',
            href: '/contacts',
            type: 'main',
            priority: true,
            place: 'right'
        },
        {
            name: 'Вход/Регистрация',
            href: '/login',
            type: 'burger',
        },
        {
            name: 'Личный кабинет',
            href: '/account',
            type: 'burger',
        },
        {
            name: 'Блог',
            href: '/blog',
            type: 'burger',
        },
        {
            name: 'Сотрудничество',
            href: '/cooperation',
            type: 'burger',
        },
        {
            name: 'Сертификаты',
            href: '/sertificates',
            type: 'burger',
        },
        {
            name: 'Вопросы и ответы',
            href: '/faq',
            type: 'burger',
        }
    ];

    interface mainItem extends ItemInterface {
        place?: string
    }

    const burgerItems: ItemInterface[] = [];
    const mainItems: mainItem[] = [];
    menu.map((item) => {
        if (item.type == 'main') {
            const i: mainItem = {
                name: item.name,
                href: item.href,
                place: item.place
            };
            mainItems.push(i);
        } else {
            const i: ItemInterface = {
                name: item.name,
                href: item.href
            };
            burgerItems.push(i);
        }
    });

    // console.log(mainItems);
    // console.log(burgerItems);


    return (
        <div {...props}>
            <nav
                className={cn(styles.header, {
                    [styles.light]: route.route == '/'
                })}
            >
                <ul className={styles['main-menu']}>
                    <li>
                        {/* <Burger2 items={burgerItems} light={route.route == '/'} state={'close'} /> */}
                    </li>
                    <ul className={styles['main-menu']}>
                        {mainItems.map((item) => {
                            if (item.place == 'left') {
                                return (
                                    <li key={item.href}>
                                        <HeaderLink light={route.route == '/'} href={item.href} isActive={route.route == item.href}>{item.name}</HeaderLink>
                                    </li>
                                );
                            }
                        })}
                        <li>
                            <Link href={'/'}>
                                <a className={cn(styles.logo, {
                                    [styles['light-logo']]: route.route == '/'
                                })}>
                                    <Logo light={route.route == '/'} />
                                </a>
                            </Link>
                        </li>
                        {mainItems.map((item) => {
                            if (item.place == 'right') {
                                return (
                                    <li key={item.href}>
                                        <HeaderLink light={route.route == '/'} href={item.href} isActive={route.route == item.href}>{item.name}</HeaderLink>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <li>
                        <Link href={'/cart'}><a><Cart items={26} light={route.route == '/'} /></a></Link>
                    </li>
                </ul>
            </nav>
        </div >
    );
};
