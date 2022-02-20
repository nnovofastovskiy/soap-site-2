import { CategoryProps } from './Category.props';
import styles from './Category.module.css';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { Shimmer } from '..';

export const Category = ({ id, name, description, image, loading = false, className, ...props }: CategoryProps): JSX.Element => {
    return (
        <div className={cn(className, styles.wrapper)} {...props}>
            <Link
                href={loading ? '' :
                    {
                        pathname: '/shop/[categoryId]',
                        query: { categoryId: id }
                    }}
            // href={'/shop/' + id}
            >
                <a className={styles.link}>
                    <div className={styles['img-wrapper']}>
                        {loading ?
                            <div className={styles['img-shimmer-wrapper']}>
                                <Shimmer className={styles['img-shimmer']} />
                            </div> :

                            <Image
                                src={process.env.NEXT_PUBLIC_DOMAIN + image.url}
                                alt={image.alt}
                                width={500}
                                height={300}
                                layout="responsive"
                                objectFit={'cover'}
                            />
                        }
                    </div>
                    {loading ?
                        <h4>
                            <Shimmer className={cn(styles.name, styles['name-shimmer'])} />
                        </h4> :

                        <h4 className={styles.name}>{name}</h4>
                    }
                    {/* <p>{description}</p> */}
                </a>
            </Link>
        </div>
    );
};