import axios from 'axios';
import styles from '../../../styles/ProductPage.module.css';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import { API } from '../../../helpers/api';
import { IProduct } from '../../../interfaces/catalog.interface';
import { Layout } from '../../../layout/ClientLayout/Layout';
import router from 'next/router';
import { BreadCrumbs, Product } from '../../../components';
import parse from 'html-react-parser';

type ProductPageProps = {
    serverProduct: IProduct | null
};

const ProductPage: NextPage<ProductPageProps> = ({ serverProduct: serverProduct }) => {
    const [product, setProduct] = useState(serverProduct);


    useEffect(() => {
        async function load() {
            const { data } = await axios.get<IProduct>(API.products.getOneById + router.query.productId);
            setProduct(data);
        }
        if (!serverProduct) {
            load();
        }
        // console.log(product);

    }, []);

    return (
        <Layout>
            <BreadCrumbs />

            {!product ? 'loading...' :
                <section className={styles['prod-wrapper']}>
                    <Product
                        apperience={'full'}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        images={product.images}
                        categoryId={product.collectionId}
                    />
                    <br />
                    {/* <pre>{JSON.stringify(product, null, 4)}</pre> */}
                </section>
            }
        </Layout>
    );
};

ProductPage.getInitialProps = async ({ query, req }: NextPageContext): Promise<ProductPageProps> => {
    if (!req) return { serverProduct: null };
    const { data: serverProduct } = await axios.get<IProduct>(API.products.getOneById + query.productId);
    // serverProduct.descriptionHTML = parse(serverProduct.description);
    return { serverProduct: serverProduct };

};

export default ProductPage;