import { AdminSidebarProps } from "./AdminSidebar.props";
import styles from './AdminSidebar.module.css';
import Link from 'next/link';
import cn from 'classnames';
import useAuth from "../../../context/useAuth";

export const AdminSidebar = ({ className, children, ...props }: AdminSidebarProps): JSX.Element => {
    // const { logout } = useAuth();

    return (
        <nav
            className={cn(className, styles.nav)}
            {...props}
        >
            {children}
        </nav>
    );
};