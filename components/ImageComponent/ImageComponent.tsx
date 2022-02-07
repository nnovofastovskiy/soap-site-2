import { ImageComponentProps } from './ImageComponent.props';
import styles from './ImageComponent.module.css';
import Image from 'next/image';
import React, { useState } from 'react';
import { Loading } from '..';
import Loader from '../Loader/Loader';

export const ImageComponent = ({ ...props }: ImageComponentProps): JSX.Element => {
    const [loading, setLoading] = useState(true);

    return (
        <div className={styles.wrapper} >
            {loading && <Loader width={500} height={500} speed={2} />}
            <Image
                onLoadStart={() => setLoading(true)}
                onLoadingComplete={() => setLoading(false)}
                {...props}
            />
        </div>
    );
};