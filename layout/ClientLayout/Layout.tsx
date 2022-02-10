import { LayoutProps } from "./Layout.props";
import styles from './Layout.module.css';
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { FunctionComponent } from 'react';
import { Cart } from "../../components";
import Link from "next/link";

export const Layout = ({ children }: LayoutProps): JSX.Element => {

    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <main className={styles.main}>
                <Link href={process.env.NEXT_PUBLIC_DOMAIN + '/cart'}>
                    <a className={styles['cart-link']}>
                        <Cart items={0} />
                    </a>
                </Link>
                {children}
            </main>
            <Footer className={styles.footer} />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>

        );
    };
};
