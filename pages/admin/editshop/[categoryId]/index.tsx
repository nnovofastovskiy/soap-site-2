import { GetServerSideProps, GetServerSidePropsContext, NextPage, NextPageContext } from 'next';
import styles from '../../../../styles/EditProducts.module.css';
import clientStyles from '../../../../styles/CategoryPage.module.css';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { EditProduct } from '../../../../admin_components';
import { Button, Product, Tab } from '../../../../components';
import { AdminLayout, withAdminLayout } from '../../../../layout/AdminLayout/AdminLayout';
import { AddCategory, AddProduct } from '../../../../admin_components';
import { TabItemInterfase } from '../../../../components/Tab/Tab.props';
import { ICategory } from '../../../../admin_components/AddCategory/AddCategory.interface';
import axios from 'axios';
import { API } from '../../../../helpers/api';
import { IProduct } from '../../../../interfaces/catalog.interface';
import { useRouter } from 'next/router';

// export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
//     let isAdmin = false;
//     if ("session" in req) {
//         const session = req["session"];
//         if ("isAdmin" in session) {
//             isAdmin = session["isAdmin"] as boolean;
//         }
//     }
//     if (!isAdmin) {
//         return {
//             redirect: {
//                 destination: '/admin/login',
//                 permanent: false,
//             },
//         };
//     }
//     return {
//         props: { isAdmin },
//     };
// };

type CategoryPageProps = {
    serverProducts: IProduct[] | null,
    serverCategories: ICategory[] | null,
};

const EditProducts: NextPage<CategoryPageProps> = ({ serverProducts, serverCategories }): JSX.Element => {
    const router = useRouter();
    const categoryId = router.query.categoryId;
    const [products, setProducts] = useState(serverProducts);
    const [categories, setCategories] = useState(serverCategories);
    const [loading, setLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState<ICategory>();
    const [createProduct, setCreateProduct] = useState(false);
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
        setLoading(false);
    }, []);

    const getCategoryName = (categories: ICategory[]) => {
        console.log(router);

        // const parseAsPath = router.asPath.split('/');
        // const parsePathName = router.pathname.split('/');
        // const idIndex = parsePathName.indexOf('[categoryId]');
        // const currentCategoryId = parseAsPath[idIndex];
        // if (categories.filter(cat => cat._id === currentCategoryId).length < 1) {
        //     router.push('/404');
        // }
        // const currentCategory = categories?.filter(cat => cat._id === currentCategoryId)[0];
        // if (currentCategory) {
        //     setCategoryName(currentCategory.name);
        // }
    };

    // useEffect(() => {
    //     try {
    //         axios.get<ICategory[]>(API.collections.read)
    //             .then((res) => {
    //                 updateProducts();
    //                 const categories = res.data;
    //                 setCategories(categories);
    //             })
    //             .catch()
    //             .finally();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);

    const updateProducts = () => {
        try {
            axios.get<IProduct[]>(API.products.getInCollectionById + categoryId)
                .then((res) => {
                    setProducts(res.data);
                })
                .catch()
                .finally();
        } catch (e) {
            console.log(e);
        }
    };
    const deleteProd = async (id: string) => {
        const { data, status } = await axios.post<{ message: string }>(API.products.delete, { _id: id });
        if (status == 200) {
            updateProducts();
        }
    };


    return (
        <AdminLayout>
            {(products && categories && !loading) ?
                <>
                    <h3>Категория {categories.filter(cat => cat._id == categoryId)[0]?.name}</h3>
                    <AddProduct updateProducts={updateProducts} categories={categories} />
                    <section className={cn(styles.products, clientStyles['prod-wrapper'])}>
                        {products.map((prod, i) => {
                            return (
                                <EditProduct
                                    key={`EditComponent${i}`}
                                    apperience={'min'}
                                    id={prod._id}
                                    name={prod.name}
                                    price={prod.price}
                                    isActive={prod.isActive}
                                    description={prod.description}
                                    images={prod.images}
                                    deleteFn={deleteProd}
                                    collectionId={prod.collectionId}
                                    allCollections={categories}
                                    refreshFn={updateProducts}
                                />
                            );
                        })}
                    </section>
                </>
                : <span>loading...</span>}
        </AdminLayout>
    );
};

EditProducts.getInitialProps = async ({ query, res, req }: NextPageContext): Promise<CategoryPageProps> => {
    console.log(query);
    if (!req) return { serverProducts: null, serverCategories: null };
    const { data: serverProducts } = await axios.get<IProduct[]>(API.products.getInCollectionById + query.categoryId);
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

export default EditProducts;