import styles from './SkeletonLoading.module.css';
import { SkeletonLoadingProps } from './SkeletonLoading.props';
import cn from 'classnames';

export const SkeletonLoading = ({ className }: SkeletonLoadingProps): JSX.Element => {
    return (
        <div className={cn(className, styles.block)}></div>
    );
};