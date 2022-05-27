import axios, { AxiosPromise } from 'axios';
import styles from '../../../styles/CategoryPage.module.css';
import { GetStaticPaths, GetStaticProps, NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import { API } from '../../../helpers/api';
import { ICategory, IProduct } from '../../../interfaces/catalog.interface';
import { Layout } from '../../../layout/ClientLayout/Layout';
import { BreadCrumbs, Product, Shimmer } from '../../../components';
import router from 'next/router';
import useCart from '../../../context/useCart';
import cn from 'classnames';

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
            const getProducts = () => axios.get<IProduct[]>(API.products.getInCollectionById + router.query.categoryId);
            const getCategories = () => axios.get<ICategory[]>(API.collections.read);
            Promise.all([
                getProducts(), getCategories()
            ]).then((res) => {
                setProducts(res[0].data);
                setCategories(res[1].data);
                getCategoryName(res[1].data);
            })
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
        if (categories.filter(cat => cat._id === currentCategoryId).length < 1) {
            router.push('/404');
        }
        const currentCategory = categories?.filter(cat => cat._id === currentCategoryId)[0];
        if (currentCategory) {
            setCategoryName(currentCategory.name);
        }
    };


    return (
        <Layout>
            <BreadCrumbs />

            {!products ?
                <>
                    <h2>
                        <Shimmer className={cn(styles.header, styles['header-shimmer'])} />
                    </h2>

                    <section className={styles['prod-wrapper']}>

                        {
                            new Array(8).fill(0).map(() => {
                                return (
                                    <Product
                                        apperience={'min'}
                                        // key={prod._id}
                                        id={''}
                                        name={''}
                                        description={''}
                                        price={0}
                                        images={[]}
                                        categoryId={''}
                                        loading
                                    />
                                )
                            })
                        }



                    </section>
                </>
                :
                <>
                    <h2 className={styles.header}>{categoryName}</h2>

                    <section className={styles['prod-wrapper']}>
                        {/* <Product
                            apperience={'min'}
                            // key={prod._id}
                            id={''}
                            name={''}
                            description={''}
                            price={0}
                            images={[]}
                            categoryId={''}
                            loading
                        /> */}
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

CategoryPage.getInitialProps = async ({ query, res, req }: NextPageContext): Promise<CategoryPageProps> => {
    if (!req) return { serverProducts: null, serverCategories: null };
    const { data: serverProducts } = await axios.get<IProduct[]>(API.products.getInCollectionById + query.categoryId);
    console.log(query);

    // const serverCategories = null;
    // console.log();
    const { data: serverCategories } = await axios.get<ICategory[]>(API.collections.read);
    if (serverCategories.filter(cat => cat._id === query.categoryId).length < 1) {
        res?.writeHead(301, { Location: '/404' });
        res?.end();
    }
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