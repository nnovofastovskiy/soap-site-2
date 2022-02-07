import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import styles from '../../../../styles/EditProducts.module.css';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { EditProduct } from '../../../../admin_components';
import { Button, Product, Tab } from '../../../../components';
import { withAdminLayout } from '../../../../layout/AdminLayout/AdminLayout';
import { AddCategory, AddProduct } from '../../../../admin_components';
import { TabItemInterfase } from '../../../../components/Tab/Tab.props';
import { ICategory } from '../../../../admin_components/AddCategory/AddCategory.interface';
import axios from 'axios';
import { API } from '../../../../helpers/api';
import { IProduct } from '../../../../interfaces/catalog.interface';
import router from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
    let isAdmin = false;
    if ("session" in req) {
        const session = req["session"];
        if ("isAdmin" in session) {
            isAdmin = session["isAdmin"] as boolean;
        }
    }
    if (!isAdmin) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }
    return {
        props: { isAdmin },
    };
};

const EditProducts: NextPage = (): JSX.Element => {
    const categoryId = router.query.categoryId;
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [currentCategory, setCurrentCategory] = useState<ICategory>();
    const [createProduct, setCreateProduct] = useState(false);

    useEffect(() => {
        try {
            axios.get<ICategory[]>(API.collections.read)
                .then((res) => {
                    updateProducts();
                    const categories = res.data;
                    setCategories(categories);
                })
                .catch()
                .finally();
        } catch (e) {
            console.log(e);
        }
    }, []);

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
        <>
            <h3>Категория {categories.filter(cat => cat._id == categoryId)[0]?.name}</h3>
            <AddProduct updateProducts={updateProducts} categories={categories} />
            <section className={styles.products}>
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
    );
};
export default withAdminLayout(EditProducts);