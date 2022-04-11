import { AddCategoryProps } from "./AddCategory.props";
import styles from './AddCategory.module.css';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Button, Input, ImgManager, Popup } from '../../components';
import { IAddCategoryForm, IAddCategoryRes, ICategory } from './AddCategory.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import Image from 'next/image';
import { EditCategory } from "..";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Error } from "mongoose";

const initImage = '/images/collections/default/img_collection.jpg';

export const AddCategory = ({ updateCategories, ...props }: AddCategoryProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IAddCategoryForm>({ mode: 'all' });
    const [isSuccsess, setIsSuccsess] = useState<boolean>(false);
    const [succsessMessage, setSuccsessMessage] = useState<string>();
    const [error, setError] = useState<string>();
    const [imagesCreate, setImagesCreate] = useState<string[]>([initImage]);
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (formData: IAddCategoryForm) => {
        try {
            const { data, status } = await axios.post<IAddCategoryRes>(API.collections.create, { ...formData, image: imagesCreate[0] });
            if (status == 201) {
                setIsSuccsess(true);
                updateCategories();
                reset();
                setIsOpen(false);
                setImagesCreate([initImage]);
            } else {
                setError('Что то пошло не так');
            }
        } catch (e) {
            setError((e as Error).message);
        }
    };

    // const getCSRFToken = async () => {
    //     const { data } = await axios.get<{ csrfToken: string }>(API.auth.getCSRFToken);
    //     axios.defaults.headers.post["X-XSRF-TOKEN"] = data.csrfToken;
    // };

    // useEffect(() => {
    //     getCSRFToken();
    // }, []);

    const variants: Variants = {
        open: {
            visibility: 'visible',
            height: 'auto'
        },
        close: {
            visibility: 'hidden',
            height: 0
        }
    };

    return (
        <>
            <Button
                appearance={'primary'}
                onClick={() => setIsOpen(!isOpen)}
            >
                Создать категорию
            </Button>
            <motion.div
                style={{ overflow: "hidden" }}
                initial={'close'}
                variants={variants}
                animate={isOpen ? 'open' : 'close'}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={cn(styles.form)}
                    {...props}
                >
                    <Input
                        {...register('name', { required: { value: true, message: 'Без названия никак (' } })}
                        error={errors.name}
                        placeholder={'Название категории'}
                    />
                    <Input
                        {...register('description')}
                        error={errors.description}
                        placeholder={'Описание'}
                    />
                    {/* <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + imagesCreate[0]}
                        width={100}
                        height={100}
                    /> */}

                    {/* <Button appearance={'primary'} type="button" onClick={() => setIsOpenFn(true)}>Выбрать фотографию</Button> */}
                    <Button appearance={'primary'} type="submit">Добавить категорию</Button>
                </form>
            </motion.div>
            {/* {imgManagerIsOpen && <ImgManager mode={'category'} setImagesFn={setImagesCreate} setIsOpenFn={setIsOpenFn} initChoosenImages={imagesCreate} />} */}
            {error}
        </>
    );

};