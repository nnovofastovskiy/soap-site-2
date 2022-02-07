import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { withLayout } from '../layout/ClientLayout/Layout';

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
    let isAccount = false;
    if ("session" in req) {
        const session = req["session"];
        if ("isAccount" in session) {
            isAccount = session["isAccount"] as boolean;
        }
    }
    if (!isAccount) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    return {
        props: { isAccount },
    };
};

const Profile: NextPage = (): JSX.Element => {
    return (
        <>
            Страница профиля
        </>
    );
};

export default withLayout(Profile);