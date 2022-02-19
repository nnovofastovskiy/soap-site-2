import axios from 'axios';
import styles from '../../styles/Shop.module.css';
import { GetStaticProps, NextPage, NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import { ICategory } from '../../interfaces/catalog.interface';
import { API } from '../../helpers/api';
import { Layout } from '../../layout/ClientLayout/Layout';
import { BreadCrumbs, Category } from '../../components';


type ShopProps = {
    serverCategories: ICategory[] | null
};

const Shop: NextPage<ShopProps> = ({ serverCategories }) => {
    const [categories, setCategories] = useState(serverCategories);

    useEffect(() => {
        async function load() {
            const { data } = await axios.get<ICategory[]>(API.collections.read);
            setCategories(data);
        }
        if (!serverCategories) {
            load();
        }
    }, []);

    return (
        <Layout>
            {/* {!categories && <Loader />} */}
            <BreadCrumbs />
            <section className={styles['cat-wrapper']}>
                {/* < Category
                    key={''}
                    id={''}
                    name={''}
                    description={''}
                    image={{ url: '', alt: '' }}
                    loading
                /> */}
                {!categories ?
                    new Array(2, 1).map((item, i) => {
                        return (
                            < Category
                                key={`shimmer-${i}`}
                                id={''}
                                name={''}
                                description={''}
                                image={{ url: '', alt: '' }}
                                loading
                            />
                        )
                    })

                    :

                    categories.map((cat) => {
                        return (
                            <Category
                                key={cat._id}
                                id={cat._id}
                                name={cat.name}
                                description={cat.description}
                                image={cat.image}
                            />
                        );
                    })

                }
            </section>

            {/* <pre>{JSON.stringify(categories, null, 4)}</pre> */}
        </Layout>
    );
};

Shop.getInitialProps = async ({ req }: NextPageContext): Promise<ShopProps> => {
    if (!req) {
        return { serverCategories: null };
    }
    const { data: serverCategories } = await axios.get<ICategory[]>(API.collections.read);
    return { serverCategories };
};

// export const getStaticProps: GetStaticProps = async () => {
//     const { data: serverCategories } = await axios.get<ICategory[]>(API.collections.read);
//     return {
//         props: {
//             serverCategories
//         }
//     };
// };

export default Shop;