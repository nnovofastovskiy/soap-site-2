import { LoginFormProps } from "./LoginForm.props";
import styles from './LoginForm.module.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ILoginForm } from './LoginForm.interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { API } from "../../helpers/api"
import useAuth from "../../context/useAuth";


export const LoginForm = ({ className, ...props }: LoginFormProps): JSX.Element => {

    const { login, loading, error } = useAuth();

    const [loginError, setLoginError] = useState<string>();
    const [loginSuccess, setloginSuccess] = useState<string>();

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors }, reset, setFocus, getValues, watch } = useForm<ILoginForm>({ mode: 'all' });

    const onSubmit = async (formData: ILoginForm) => {
        login(formData.email, formData.password);
    };

    // const getCSRFToken = async () => {
    //     const response = await axios.get(API.auth.getCSRFToken);
    //     axios.defaults.headers.post["X-XSRF-TOKEN"] = response.data.csrfToken;
    // };

    // useEffect(() => {
    //     getCSRFToken();
    // }, []);


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
            <span className={styles.error}>{error}</span>
            <Button appearance={'primary'} type="submit">Войти</Button>
            {(loginError) ? <span>{loginError}</span> : <></>}
        </form>
    );

};