import { GetServerSideProps, GetServerSidePropsContext, NextPage, NextPageContext } from 'next';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { EditProduct as EditProductComponent } from '../../../../admin_components'
import { Product, Tab } from '../../../../components';
import { AdminLayout, withAdminLayout } from '../../../../layout/AdminLayout/AdminLayout';
import { AddCategory, AddProduct } from '../../../../admin_components';
import { TabItemInterfase } from '../../../../components/Tab/Tab.props';
import { ICategory } from '../../../../admin_components/AddCategory/AddCategory.interface';
import axios from 'axios';
import { API } from '../../../../helpers/api';
import { IProduct } from '../../../../interfaces/catalog.interface';
import router, { useRouter } from 'next/router';

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

const initProduct: IProduct = {
    _id: '',
    description: '',
    collectionId: '',
    images: [],
    name: '',
    isActive: false,
    price: 0
};

type ProductPageProps = {
    serverProduct: IProduct | null
};

const EditProduct: NextPage<ProductPageProps> = ({ serverProduct: serverProduct }): JSX.Element => {
    // const productId = router.query.productId;
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [categories, setCategories] = useState<ICategory[]>([]);
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

    useEffect(() => {
        setLoading(false);
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
            // axios.get<IProduct>(API.products.getOneById + productId)
            //     .then((res) => {
            //         setProduct(res.data);
            //     })
            //     .catch()
            //     .finally();
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
        <AdminLayout>
            {/* {productId} */}
            {(!!product && !loading) &&
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
        </AdminLayout>
    );
};

EditProduct.getInitialProps = async ({ query, res, req }: NextPageContext): Promise<ProductPageProps> => {
    if (!req) return { serverProduct: null };
    const { data: serverProducts } = await axios.get<IProduct[]>(API.products.getInCollectionById + query.categoryId);
    const { data: serverProduct } = await axios.get<IProduct>(API.products.getOneById + query.productId);
    // const { data: serverCategories } = await axios.get<ICategory[]>(API.collections.read);
    if (serverProducts.filter(prod => prod._id === query.productId).length < 1) {
        res?.writeHead(301, { Location: '/404' });
        res?.end();
    }
    // serverProduct.descriptionHTML = parse(serverProduct.description);
    return { serverProduct: serverProduct };

};

export default EditProduct;