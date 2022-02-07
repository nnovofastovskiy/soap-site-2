import { NextPage } from 'next';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { withLayout } from '../layout/ClientLayout/Layout';
import useAuth, { AuthContext } from '../context/useAuth';
import { AuthenticatedRoute } from './_app';
import { TextEditor } from '../components';
import { API } from '../helpers/api';
import axios from 'axios';
import { IProduct } from '../interfaces/catalog.interface';
import parse from 'html-react-parser';


const Test: NextPage = ({ serverProduct }): JSX.Element => {
    const [product, setProduct] = useState<IProduct>(serverProduct);
    console.log(serverProduct);

    const { user, loading } = useAuth();
    // console.log(h.string);

    // const str = h.string;
    return (
        <>
            {/* {description.map(item => <pre>{item}</pre>)} */}
            <pre>{parse(product.description)}</pre>
            <TextEditor mode={''} description={''} />

        </>
    );
};

export async function getStaticProps() {
    const { data: serverProduct } = await axios.get<IProduct>(API.products.getOneById + '61bb2d66407907fb8ff33b32');
    console.log(decodeURI(serverProduct.description));
    serverProduct.description = decodeURI(serverProduct.description);

    return {
        props: serverProduct  // will be passed to the page component as props
    };
}

export default withLayout(Test);