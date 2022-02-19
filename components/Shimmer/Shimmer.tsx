import styles from './Shimmer.module.css';
import { ShimmerProps } from './Shimmer.props';
import cn from 'classnames';

export const Shimmer = ({ className }: ShimmerProps): JSX.Element => {
    return (
        <div className={cn(className, styles.block)}></div>
    );
};