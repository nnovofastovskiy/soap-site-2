import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { EditProduct as EditProductComponent } from '../../../../admin_components'
import { Product, Tab } from '../../../../components';
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

const initProduct: IProduct = {
    _id: '',
    description: '',
    collectionId: '',
    images: [],
    name: '',
    isActive: false,
    price: 0
};

const EditProduct: NextPage = (): JSX.Element => {
    const productId = router.query.productId;
    const [product, setProduct] = useState<IProduct>();
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        try {
            axios.get<ICategory[]>(API.collections.read)
                .then((res) => {
                    updateProduct();
                    setCategories(res.data);
                })
                .catch()
                .finally();
        } catch (e) {
            console.log(e);
        }
    }, []);

    const updateProduct = () => {
        try {
            axios.get<IProduct>(API.products.getOneById + productId)
                .then((res) => {
                    setProduct(res.data);
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
            updateProduct();
        }
    };


    return (
        <div>
            {/* {productId} */}
            {!!product &&
                <EditProductComponent
                    apperience={'full'}
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    images={product.images}
                    deleteFn={(id: string) => deleteProd(id)}
                    isActive={product.isActive}
                    collectionId={product.collectionId}
                    allCollections={categories}
                    refreshFn={updateProduct}
                />

            }
        </div>
    );
};
export default withAdminLayout(EditProduct);