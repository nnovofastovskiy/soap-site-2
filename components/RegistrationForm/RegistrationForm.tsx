import { RegistrationFormProps } from "./RegistrationForm.props";
import styles from './RegistrationForm.module.css';
import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { IRegistrationForm } from './RegistrationForm.interface';
import axios from 'axios';
import { API } from "../../helpers/api";
import useAuth from "../../context/useAuth";

export const RegistrationForm = ({ className, ...props }: RegistrationFormProps): JSX.Element => {
    const { signUp } = useAuth();

    const { register, control, handleSubmit, formState: { errors } } = useForm<IRegistrationForm>({ mode: 'all' });

    const onSubmit = async (formData: IRegistrationForm) => {
        signUp(formData.email, formData.name, formData.password);
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
                {...register('email', { required: { value: true, message: 'Введите email' } })}
                error={errors.email}
                placeholder={'email'}
            />
            <Input
                {...register('name', { required: { value: true, message: 'Введите имя' } })}
                error={errors.name}
                placeholder={'Имя'}
            />
            <Input
                {...register('password', { required: { value: true, message: 'Введите пароль' } })}
                error={errors.password}
                placeholder='Пароль'
            />
            <Button appearance={'primary'} type="submit">Зарегистрироваться</Button>
        </form>
    );

}