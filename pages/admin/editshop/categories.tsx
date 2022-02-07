import styles from "../../../styles/editShop/categories.module.css";
import Image from 'next/image';
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { AddCategory } from "../../../admin_components";
import { API } from "../../../helpers/api";
import { ICategory } from "../../../interfaces/catalog.interface";
import { withAdminLayout } from "../../../layout/AdminLayout/AdminLayout";
import Link from "next/link";

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

const EditCategories: NextPage = (): JSX.Element => {

    const [categories, setCategories] = useState<ICategory[]>();

    useEffect(() => {
        updateCategories();
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

    return (
        <>
            <AddCategory updateCategories={updateCategories} />
            <section
                className={styles.wrapper}
            >
                <span>Фотография</span>
                <span>Название</span>
                <span>Отобразить</span>
                <span>Удалить</span>
                {categories?.map(category => {
                    return (
                        <>
                            <Image
                                src={process.env.NEXT_PUBLIC_DOMAIN + category.image.url}
                                alt={category.image.alt}
                                width={500}
                                height={300}
                                // layout="responsive"
                                objectFit={'cover'}
                            />
                            <div>
                                <Link href=''>
                                    <a>{category.name}</a>
                                </Link>
                                <p>{category.description}</p>
                            </div>
                            <label>
                                <input type="checkbox" />
                            </label>

                        </>
                    );
                })}
            </section>
            <pre>{JSON.stringify(categories, null, 4)}</pre>
        </>
    );
};

export default withAdminLayout(EditCategories);