import styles from './Shimmer.module.css';
import { ShimmerProps } from './Shimmer.props';
import cn from 'classnames';

export const Shimmer = ({ children, tag = 'div', className }: ShimmerProps): JSX.Element => {
    switch (tag) {
        case 'div': {
            return (
                <div className={cn(className, styles.block)}>
                    {children}
                </div>
            );
        }
        case 'p': {
            return (
                <p className={cn(className, styles.block)}>
                    {children}
                </p>
            );
        }
        default: {
            return (
                <div className={cn(className, styles.block)}>
                    {children}
                </div>
            );
        }
    }
};