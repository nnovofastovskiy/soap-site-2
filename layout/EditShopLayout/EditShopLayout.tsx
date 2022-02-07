import { LayoutProps } from "./EditShopLayout.props";
import styles from './AdminLayout.module.css';
import { EditShopHeader } from "./EditShopHeader/EditShopHeader";
import React, { FunctionComponent } from 'react';
import router from "next/router";
import { NextPageContext } from "next";



const EditShopLayout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <EditShopHeader className={styles.header} />
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
};

export const withEditShopLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withAdminLayoutComponent(props: T): JSX.Element {
        return (
            <EditShopLayout>
                <Component {...props} />
            </EditShopLayout>
        );
    };
};
