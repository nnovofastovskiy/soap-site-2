import { AdminHeaderProps } from "./AdminHeader.props";
import styles from './AdminHeader.module.css';
// import HeaderLink from 'next/link';
import cn from 'classnames';
import useAuth from "../../../context/useAuth";
import { HeaderLink } from "../../../components";
import router from "next/router";

export const AdminHeader = ({ className, currentRoute, ...props }: AdminHeaderProps): JSX.Element => {
    // const { logout } = useAuth();

    return (
        <nav
            className={cn(className, styles.nav)}
            {...props}
        >
            <ul>
                <li>
                    <HeaderLink href={'/'} isActive={currentRoute == '/'}>На главную сайта</HeaderLink>
                </li>
                <li>
                    <HeaderLink href={'/admin'} isActive={currentRoute == '/admin'}>На главную админки</HeaderLink>
                </li>
                <li>
                    <HeaderLink href={'/admin/editshop'} isActive={currentRoute.includes('editshop')}>Магазин</HeaderLink>
                </li>
                <li>
                    {/* <a href={''} onClick={logout}>Выйти</a> */}
                </li>
            </ul>
        </nav>
    );
};