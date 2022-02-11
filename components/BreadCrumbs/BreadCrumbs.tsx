import { BreadCrumbsProps } from './BreadCrumbs.props';
import styles from './BreadCrumbs.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const BreadCrumbs = ({ className, items, ...props }: BreadCrumbsProps): JSX.Element => {
    const router = useRouter();
    const routes = router.route.split('/');
    routes.shift();
    return (
        <div {...props}>
            <pre>
                {JSON.stringify(router, null, 4)}
                {routes.map((route, i) => {
                    <Link
                        key={`link-${i}`}
                        href={{ pathname: '', query: '' }}
                    >
                        <a>
                            {route}
                        </a>
                    </Link>;
                })}
            </pre>
        </div>
    );
};