import { AdminHeaderProps } from "./AdminHeader.props";
import styles from './AdminHeader.module.css';
// import HeaderLink from 'next/link';
import cn from 'classnames';
import useAuth from "../../../context/useAuth";
import { HeaderLink } from "../../../components";
import router from "next/router";

export const AdminHeader = ({ className, ...props }: AdminHeaderProps): JSX.Element => {
    // const { logout } = useAuth();

    return (
        <nav
            className={cn(className, styles.nav)}
            {...props}
        >
            <ul>
                <li>
                    <HeaderLink href={'/'} isActive={router.route == '/'}>На главную сайта</HeaderLink>
                </li>
                <li>
                    <HeaderLink href={'/admin'} isActive={router.route == '/admin'}>На главную админки</HeaderLink>
                </li>
                <li>
                    <HeaderLink href={'/admin/editshop'} isActive={router.route.includes('editshop')}>Магазин</HeaderLink>
                </li>
                <li>
                    {/* <a href={''} onClick={logout}>Выйти</a> */}
                </li>
            </ul>
        </nav>
    );
};