import { BreadCrumbsProps } from './BreadCrumbs.props';
import styles from './BreadCrumbs.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const BreadCrumbs = ({ className, items, ...props }: BreadCrumbsProps): JSX.Element => {
    const [data, setData] = useState();
    const [text, setText] = useState<string>();
    const router = useRouter();
    const routes = router.asPath.split('/');
    routes.shift();
    const hrefs = routes.map((subpath, i) => {
        return '/' + routes.slice(0, i + 1).join('/');
    });

    useEffect(() => {
        const text = document.querySelector(`.crumb-${routes[routes.length - 1]}`)?.innerHTML;
        setText(text);

    }, []);


    return (
        <div
            className={styles.wrapper}
            {...props}
        >
            <pre>
                {JSON.stringify(text, null, 4)}
            </pre>

            {hrefs.map((href, i) => {
                return (
                    <div
                        key={`crumb-${i}`}
                    >
                        <Link
                            key={`link-${i}`}
                            href={href}
                        >
                            {process.env.NEXT_PUBLIC_DOMAIN + href}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};