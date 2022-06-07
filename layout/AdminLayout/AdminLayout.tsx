import { LayoutProps } from "./AdminLayout.props";
import styles from './AdminLayout.module.css';
import { AdminHeader } from "./AdminHeader/AdminHeader";
import { AdminSidebar } from "./AdminSidebar/AdminSidebar";
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import router, { useRouter } from "next/router";
import useAuth from "../../context/useAuth";
import { HeaderLink } from "../../components";

const editShopSidebar = (currentRoute: string) => {
    return (
        <ul>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop'
                    isActive={currentRoute == '/admin/editshop'}
                >
                    Каталог
                </HeaderLink>
            </li>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop/categories'
                    isActive={currentRoute == '/admin/editshop/categories'}
                >
                    Категории
                </HeaderLink>
            </li>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop/products'
                    isActive={currentRoute == '/admin/editshop/products'}
                >
                    Продукты
                </HeaderLink>
            </li>
            <li>
                <HeaderLink
                    className={styles['sidebar-link']}
                    href='/admin/editshop/parameters'
                    isActive={currentRoute == '/admin/editshop/parameters'}
                >
                    Параметры
                </HeaderLink>
            </li>
        </ul>
    );
};


export const AdminLayout = ({ children }: LayoutProps): JSX.Element => {
    // const { isAdmin, loading } = useAuth();
    const router = useRouter();
    const currentRoute = router.pathname;

    // if (loading) {
    //     return <p>loading...</p>;
    // } else {
    // if (!isAdmin) {
    //     // router.push('/admin/login');
    //     return <></>;
    // } else {
    return (
        <div className={styles.wrapper}>
            <AdminHeader className={styles.header} currentRoute={currentRoute} />
            {/* <AdminSidebar className={styles.sidebar}>
                {currentRoute.includes('editshop') && editShopSidebar(currentRoute)}
            </AdminSidebar> */}
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
    // }
    // }
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
