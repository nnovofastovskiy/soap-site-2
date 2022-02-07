import SpinnerIcon from './Spinner.svg';
import styles from './Spinner.module.css';

export const Spinner = (): JSX.Element => {
    return (
        <SpinnerIcon className={styles.spinner} />
    );
};