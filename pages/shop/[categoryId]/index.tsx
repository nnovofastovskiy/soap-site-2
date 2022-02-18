import axios from 'axios';
import styles from '../../../styles/CategoryPage.module.css';
import { GetStaticPaths, GetStaticProps, NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import { API } from '../../../helpers/api';
import { ICategory, IProduct } from '../../../interfaces/catalog.interface';
import { Layout } from '../../../layout/ClientLayout/Layout';
import { BreadCrumbs, Product } from '../../../components';
import router from 'next/router';
import useCart from '../../../context/useCart';

type CategoryPageProps = {
    serverProducts: IProduct[] | null,
    serverCategories: ICategory[] | null,
};

const CategoryPage: NextPage<CategoryPageProps> = ({ serverProducts, serverCategories }) => {
    // const categoryId = router.query.categoryId;
    // console.log(router.query.categoryId);

    const [products, setProducts] = useState(serverProducts);
    const [categories, setCategories] = useState(serverCategories);
    const [categoryName, setCategoryName] = useState<string>();

    useEffect(() => {
        async function load() {
            const { data: products } = await axios.get<IProduct[]>(API.products.getInCollectionById + router.query.categoryId);
            const { data: categories } = await axios.get<ICategory[]>(API.collections.read);

            setProducts(products);
            setCategories(categories);
            getCategoryName(categories);
        }
        if (!serverCategories) {
            load();
        } else {
            getCategoryName(serverCategories);
        }
    }, []);

    const getCategoryName = (categories: ICategory[]) => {
        const parseAsPath = router.asPath.split('/');
        const parsePathName = router.pathname.split('/');
        const idIndex = parsePathName.indexOf('[categoryId]');
        const currentCategoryId = parseAsPath[idIndex];
        const currentCategory = categories?.filter(cat => cat._id === currentCategoryId)[0];
        if (currentCategory) {
            setCategoryName(currentCategory.name);
        }
    };


    return (
        <Layout>
            <BreadCrumbs />

            {!products ? 'loading...' :
                <>
                    <h2>{categoryName}</h2>
                    {/* <pre>{JSON.stringify(router.asPath, null, 4)}</pre>
                    <pre>{JSON.stringify(router.pathname, null, 4)}</pre> */}
                    {/* <pre>{JSON.stringify(categories, null, 4)}</pre> */}
                    {/* <pre>{JSON.stringify(categories, null, 4)}</pre> */}
                    <section className={styles['prod-wrapper']}>
                        {products.map((prod) => {
                            return (
                                <Product
                                    apperience={'min'}
                                    key={prod._id}
                                    id={prod._id}
                                    name={prod.name}
                                    description={prod.description}
                                    price={prod.price}
                                    images={prod.images}
                                    categoryId={prod.collectionId}
                                />
                            );
                        })}
                    </section>
                </>
            }
        </Layout>
    );
};

CategoryPage.getInitialProps = async ({ query, req }: NextPageContext): Promise<CategoryPageProps> => {
    if (!req) return { serverProducts: null, serverCategories: null };
    const { data: serverProducts } = await axios.get<IProduct[]>(API.products.getInCollectionById + query.categoryId);
    // const serverCategories = null;
    const { data: serverCategories } = await axios.get<ICategory[]>(API.collections.read);
    return {
        serverProducts,
        serverCategories,
    };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     const { data: serverCategories } = await axios.get<ICategory[]>(API.collections.read);
//     return {
//         paths: serverCategories.map(cat => '/shop/' + cat._id),
//         fallback: true
//     };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     if (!params) {
//         return {
//             notFound: true
//         };
//     }
//     const { data: serverProducts } = await axios.get<IProduct[]>(API.products.getInCollectionById + params.category);
//     return {
//         props: {
//             serverProducts
//         }
//     };
// };

export default CategoryPage;