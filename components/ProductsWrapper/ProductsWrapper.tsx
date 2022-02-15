import { ProductsWrapperProps } from './ProductsWrapper.props';
import styles from './ProductsWrapper.module.css';
import cn from 'classnames';
import { Product } from '..';

export const ProductsWrapper = ({ products, className, ...props }: ProductsWrapperProps): JSX.Element => {
    return (
        <section
            className={cn(className)}
            {...props}
        >

        </section>
    );
};