import { AddProductProps } from "./AddProduct.props";
import styles from './AddProduct.module.css';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { Button, ImgManager, Input, Popup, TextArea } from '../../components';
import { IAddProductForm, IAddProductRes, IProduct } from './AddProduct.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { ICategory } from "../AddCategory/AddCategory.interface";
import { EditProduct } from "..";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { IImage } from "../../interfaces/image.interface";
import Image from 'next/image';


const initImage = '/images/products/default/img_product_1.jpg';

export const AddProduct = ({ updateProducts, categories, ...props }: AddProductProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IAddProductForm>({ mode: 'all' });
    const [isSuccsess, setIsSuccsess] = useState<boolean>(false);
    const [succsessMessage, setSuccsessMessage] = useState<string>();
    const [error, setError] = useState<string>();
    // const [categories, setCategories] = useState<ICategory[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [imgManagerIsOpen, setImgManagerIsOpen] = useState<boolean>(false);
    const [imagesCreate, setImagesCreate] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const setIsOpenFn = (state: boolean) => {
        setImgManagerIsOpen(state);
    };

    useEffect(() => {
        try {
            axios.get<ICategory[]>(API.collections.read)
                .then((res) => {
                    // updateProducts();
                    // setCategories(res.data);
                    reset();
                })
                .catch()
                .finally();
        } catch (e) {
            console.log(e as Error);

        }
    }, []);

    // const updateProducts = () => {
    //     try {
    //         axios.get<IProduct[]>(API.products.getFull).then(
    //             ({ data }) => {
    //                 setProducts(data);
    //             }
    //         );
    //     } catch (e) {
    //         console.log(e as Error);
    //     }
    // };

    const onSubmit = async (formData: IAddProductForm) => {
        console.log(formData);

        try {
            // const { data, status } = await axios.post<IAddProductRes>(API.products.create, { ...formData, images: imagesCreate });
            const { data, status } = await axios.post<IAddProductRes>(API.products.create, { ...formData, description: '', images: JSON.stringify(imagesCreate) });
            if (status == 201) {
                updateProducts();
                setIsSuccsess(true);
                reset();
                // setCategories(data);
                // alert('OK');
            } else {
                setError('Что то пошло не так');
            }
            // console.log(data);
        } catch (e) {
            setError((e as Error).message);
        }
    };

    const deleteProd = async (id: string) => {
        const { data, status } = await axios.post<{ message: string }>(API.products.delete, { _id: id });
        if (status == 200) {
            updateProducts();
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
            display: 'block',
            height: 'auto'
        },
        close: {
            visibility: 'hidden',
            // display: 'none',
            height: 0
        }
    };

    return (
        <>
            <Button
                appearance={'primary'}
                onClick={() => setIsOpen(!isOpen)}
            >
                Создать продукт
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
                        placeholder={'Название продукта'}
                    />
                    {categories.map((cat) => {
                        return (
                            <label key={cat._id} htmlFor={cat._id}>
                                <input
                                    {...register('collectionId', { required: { value: true, message: 'Обязательное поле' } })}
                                    type="radio"
                                    name="collectionId"
                                    id={cat._id}
                                    value={cat._id}
                                />
                                <span>{cat.name}</span>
                                {/* {errors.collectionId} */}
                            </label>
                        );
                    })}
                    <Input
                        {...register('price', { required: { value: true, message: 'Цена обязательна' } })}
                        error={errors.price}
                        placeholder={'Цена'}
                        type="number"
                        min="1"
                    // max="100000"
                    />
                    {/* <TextArea
                                className={styles.description}
                                {...register('description')}
                                error={errors.description}
                                placeholder={'Описание'}
                            /> */}

                    <label htmlFor="isActive">
                        <input
                            {...register('isActive')}
                            type="checkbox"
                            id="isActive"
                            defaultChecked />
                        <span>Опубликовать</span>
                    </label>

                    {imagesCreate.length ? imagesCreate.map((imageSrc, i) => {
                        return (
                            <Image
                                key={`choosenImage-${i}`}
                                src={process.env.NEXT_PUBLIC_DOMAIN + imageSrc}
                                width={100}
                                height={100}
                            />
                        );
                    }) :
                        <Image
                            src={process.env.NEXT_PUBLIC_DOMAIN + initImage}
                            width={100}
                            height={100}
                        />
                    }
                    <Button appearance={'primary'} type="button" onClick={() => setIsOpenFn(true)}>Выбрать фотографии</Button>
                    <Button appearance={'primary'} type="submit">Добавить продукт</Button>

                    {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
                </form>
            </motion.div>
            {/* {imgManagerIsOpen && <ImgManager setImagesFn={setImagesCreate} initChoosenImages={imagesCreate} inputType={"checkbox"} id={""} />} */}
            {/* {JSON.stringify(products, null, 2)} */}
        </>
    );

};