import { NextPage } from 'next';
import React from 'react';
import { AdminLoginForm } from '../../admin_components/AdminLoginForm/AdminLoginForm';

const AdminLogin: NextPage = (): JSX.Element => {

    return (
        <>
            Страница входа за админа
            <AdminLoginForm />
        </>
    );
};


export default AdminLogin;