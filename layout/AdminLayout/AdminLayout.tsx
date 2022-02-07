import { LayoutProps } from "./AdminLayout.props";
import styles from './AdminLayout.module.css';
import { AdminHeader } from "./AdminHeader/AdminHeader";
import { AdminSidebar } from "./AdminSidebar/AdminSidebar";
import React, { FunctionComponent } from 'react';
import router from "next/router";
import useAuth from "../../context/useAuth";
import { HeaderLink } from "../../components";

const editShopSidebar = () => {
    return (
        <ul>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop'
                    isActive={router.route == '/admin/editshop'}
                >
                    Каталог
                </HeaderLink>
            </li>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop/categories'
                    isActive={router.route == '/admin/editshop/categories'}
                >
                    Категории
                </HeaderLink>
            </li>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop/products'
                    isActive={router.route == '/admin/editshop/products'}
                >
                    Продукты
                </HeaderLink>
            </li>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop/parameters'
                    isActive={router.route == '/admin/editshop/parameters'}
                >
                    Параметры
                </HeaderLink>
            </li>
        </ul>
    );
}


const AdminLayout = ({ children }: LayoutProps): JSX.Element => {
    const { isAdmin, loading } = useAuth();

    if (loading) {
        return <p>loading...</p>;
    } else {
        if (!isAdmin) {
            // router.push('/admin/login');
            return <></>;
        } else {
            return (
                <div className={styles.wrapper}>
                    <AdminHeader className={styles.header} />
                    <AdminSidebar className={styles.sidebar}>
                        {router.route.includes('editshop') && editShopSidebar()}
                    </AdminSidebar>
                    <div className={styles.main}>
                        {children}
                    </div>
                </div>
            );
        }
    }
};

export const withAdminLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withAdminLayoutComponent(props: T): JSX.Element {
        return (
            <AdminLayout>
                <Component {...props} />
            </AdminLayout>
        );
    };
};
