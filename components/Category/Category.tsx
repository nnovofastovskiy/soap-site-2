import { CategoryProps } from './Category.props';
import styles from './Category.module.css';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

export const Category = ({ id, name, description, image, className, ...props }: CategoryProps): JSX.Element => {
    return (
        <div className={cn(className, styles.wrapper)} {...props}>
            <Link
                href={{
                    pathname: '/shop/[categoryId]',
                    query: { categoryId: id }
                }}
            // href={'/shop/' + id}
            >
                <a className={styles.link}>
                    <div className={styles['img-wrapper']}>
                        <Image
                            src={process.env.NEXT_PUBLIC_DOMAIN + image.url}
                            alt={image.alt}
                            width={500}
                            height={300}
                            // layout="responsive"
                            objectFit={'cover'}
                        />
                    </div>
                    <h4>{name}</h4>
                    <p>{description}</p>
                </a>
            </Link>
        </div>
    );
};