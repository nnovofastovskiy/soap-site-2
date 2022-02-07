import { AdminLoginFormProps } from "./AdminLoginForm.props";
import styles from './AdminLoginForm.module.css';
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { IAdminLoginForm } from './AdminLoginForm.interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { API } from "../../helpers/api";
import useAuth from "../../context/useAuth";

export const AdminLoginForm = ({ className, ...props }: AdminLoginFormProps): JSX.Element => {
    const { adminLogin, isAdmin } = useAuth();

    const [loginError, setLoginError] = useState<string>();
    const [loginSuccess, setloginSuccess] = useState<string>();

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<IAdminLoginForm>({ mode: 'all' });

    const onSubmit = async (formData: IAdminLoginForm) => {
        adminLogin(formData.email, formData.password, formData.wordv2);
    };

    const getCSRFToken = async () => {
        const { data } = await axios.get<{ csrfToken: string }>(API.auth.getCSRFToken);
        axios.defaults.headers.post["X-XSRF-TOKEN"] = data.csrfToken;
    };

    useEffect(() => {
        getCSRFToken();
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(className, styles.form)}
            {...props}
        >
            <Input
                {...register('email', {
                    required: { value: true, message: 'Введите email' },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",

                    }
                })}
                error={errors.email}
                placeholder={'email'}
                type='email'
            />
            <Input
                {...register('password', { required: { value: true, message: 'Введите пароль' } })}
                error={errors.password}
                placeholder='Пароль'
                type='password'
            />
            <Input
                {...register('wordv2', { required: { value: true, message: 'Введите слово' } })}
                error={errors.wordv2}
                placeholder='Слово'
            />
            GiveMeTheFuture
            <Button appearance={'primary'} type="submit">Войти как администратор</Button>
            {(loginError) ? <span>{loginError}</span> : <></>}
        </form>
    );
};