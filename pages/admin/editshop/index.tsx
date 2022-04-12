import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import styles from '../../../styles/EditCatalog.module.css';
import clientStyles from '../../../styles/Shop.module.css';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Tab } from '../../../components';
import { withAdminLayout } from '../../../layout/AdminLayout/AdminLayout';
import { AddCategory, AddProduct, EditCategory } from '../../../admin_components';
import { TabItemInterfase } from '../../../components/Tab/Tab.props';
import { ICategory } from '../../../admin_components/AddCategory/AddCategory.interface';
import axios from 'axios';
import { API } from '../../../helpers/api';

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

const EditCatalog: NextPage = (): JSX.Element => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [createCategory, setCreateCategory] = useState(false);

    useEffect(() => {
        try {
            axios.get<ICategory[]>(API.collections.read)
                .then((res) => {
                    setCategories(res.data);
                })
                .catch()
                .finally();
        } catch (e) {
            console.log(e);
        }
    }, []);

    const updateCategories = () => {
        try {
            axios.get<ICategory[]>(API.collections.read).then(
                ({ data }) => {
                    setCategories(data);
                }
            );
        } catch (e) {
            console.log(e as Error);
        }
    };

    const deleteCat = async (id: string) => {
        const { data, status } = await axios.post<{ message: string }>(API.collections.delete, { _id: id });
        if (status == 200) {
            updateCategories();
        }
    };

    return (
        <>
            <nav>
            </nav>
            <AddCategory updateCategories={updateCategories} />
            <section className={cn(styles.categories, clientStyles['cat-wrapper'])}>
                {categories.map((cat) => {
                    return (
                        <EditCategory
                            key={cat._id}
                            id={cat._id}
                            name={cat.name}
                            description={cat.description}
                            image={cat.image}
                            deleteFn={(id: string) => deleteCat(id)}
                            refreshFn={updateCategories}
                        />
                    );
                })}
            </section>
        </>
    );
};
export default withAdminLayout(EditCatalog);