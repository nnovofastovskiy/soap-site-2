import { LoadingProps } from './Loading.props';
import styles from './Loading.module.css';
import cn from 'classnames';

export const Loading = ({ theme, ...props }: LoadingProps): JSX.Element => {
    return (
        <div className={cn(styles.loading, {
            [styles.light]: theme == 'light',
            [styles.dark]: theme == 'dark'
        })} {...props}>
        </div>
    );
};
