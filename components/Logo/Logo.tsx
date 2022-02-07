import { LogoProps } from "./Logo.props";
import styles from './Logo.module.css';
import LogoIconDark from './logo-dark.svg'
import LogoIconLight from './logo-light.svg'
import { useRouter } from 'next/router';

export const Logo = ({ light, ...props }: LogoProps): JSX.Element => {
    return (
        <div
            className={styles.wrapper}
            {...props}
        >
            {light ? <LogoIconLight className={styles.image} /> : <LogoIconDark className={styles.image} />}
            <hr className={styles.hr} />
            <span className={styles.name}>FEEL LAB</span>
            <span className={styles.description}>Лаборатория чувств</span>
        </div>
    );
}