import { AdminHeaderProps } from "./EditShopHeader.props";
import styles from './AdminHeader.module.css';
import Link from 'next/link';
import cn from 'classnames';

export const EditShopHeader = ({ ...props }: AdminHeaderProps): JSX.Element => {

    return (
        <>
            <nav
                className={cn(styles.header)}
                {...props}
            >
                <ul>
                    <li>
                        <Link href={'/'}><a>На главную сайта</a></Link>
                    </li>
                    <li>
                        <Link href={'/admin'}><a>На главную админки</a></Link>
                    </li>
                    <li>
                        <Link href={'/admin/editshop'}><a>Магазин</a></Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};