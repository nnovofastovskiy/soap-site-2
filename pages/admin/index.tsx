import { GetServerSideProps, GetServerSidePropsContext, NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { withAdminLayout } from '../../layout/AdminLayout/AdminLayout';
import axios from 'axios';
import { useRouter } from 'next/router';

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

const Admin: NextPage = (): JSX.Element => {
    return (
        <>
            Главная страница панели администратора
        </>
    );
};

export default withAdminLayout(Admin);