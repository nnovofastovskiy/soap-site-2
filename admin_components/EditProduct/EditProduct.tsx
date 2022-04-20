import { EditProductProps } from './EditProduct.props';
import productStyles from '../../components/Product/Product.module.css';
import styles from './EditProduct.module.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { ImgManager } from '..';
import axios from 'axios';
import { API } from '../../helpers/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AddToCart, Button, Product, TextEditor } from '../../components';
import WishIcon from '../../icons/wish.svg';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { IImageDb } from '../../interfaces/image.interface';
import useAuth from '../../context/useAuth';
import dynamic from 'next/dynamic';

export const EditProduct = ({ apperience, id, name, price, description, isActive, images, deleteFn, refreshFn, collectionId, allCollections, className, ...props }: EditProductProps): JSX.Element => {

    const blocksFromHTML = convertFromHTML(description);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );

    const initImageUrls = images.map(image => image.url);

    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);
    const [editPrice, setEditPrice] = useState<number>(price);
    const [editDescription, setEditDescription] = useState<string>(description);
    const [editCollectionId, setEditCollectionId] = useState<string>(collectionId);
    const [editIsActive, setEditIsActive] = useState<boolean>(isActive);
    const [editImages, setEditImages] = useState<string[]>(initImageUrls);
    const [deleteInitOn, setDeleteInitOn] = useState<boolean>(false);
    const [imgManagerIsOpen, setImgManagerIsOpen] = useState<boolean>(false);
    const [imageNumber, setImageNumber] = useState(0);
    const [allImages, setAllImages] = useState<IImageDb[]>([]);

    const { setPopupActive } = useAuth();


    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(state)
        // EditorState.createWithContent(ContentState.createFromText(description))
    );

    const setIsOpenFn = (state: boolean) => {
        setImgManagerIsOpen(state);
    };

    const setImagesFn = (images: string[]) => {
        console.log('setImagesFn');

        setEditImages(images);
        setImageNumber(0);
    };


    useEffect(() => {
        try {
            axios.get<IImageDb[]>(API.images.allImages)
                .then(({ data, status }) => {
                    if (status == 200) {
                        const allImages = data;
                    }
                })
                .catch((e) => {
                    console.log(e as Error);
                });
        } catch (e) {
            console.log(e as Error);
        }
    }, []);

    useEffect(() => {
        setIsEdited((editName != name) ||
            (editPrice != price) ||
            (editDescription != description) ||
            (editCollectionId != collectionId) ||
            (editIsActive != isActive) ||
            (!isEqual(editImages, initImageUrls))
        );
    }, [editName, editPrice, editDescription, editCollectionId, editIsActive, editImages]);

    useEffect(() => {
        if (full) {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            // console.log(rawContentState);

            const descriptionMarkup = draftToHtml(rawContentState);
            setEditDescription(descriptionMarkup);
        }
    }, [editorState.getCurrentContent()]);

    const setDesctriptionFn = (description: string) => {
        setEditDescription(description);
    };

    const isEqual = (arr1: string[], arr2: string[]) => {
        if (arr1.length != arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    };

    const min = apperience == 'min';
    const full = apperience == 'full';
    const cart = apperience == 'cart';

    const imageComponent = () => {
        return (
            <>
                {min &&
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + editImages[0]}
                        // alt={images[0].alt}
                        width={500}
                        height={300}
                        objectFit={'cover'}
                        priority={true}
                    />
                }

                {full &&
                    <>
                        <div>
                            {/* <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                navigation
                                pagination
                            >
                                {images.map(image => {
                                    return (
                                        <SwiperSlide
                                            key={image}
                                        >
                                            <Image
                                                src={image}
                                                width={(min) ? 500 : (full) ? 500 : 300}
                                                height={(min) ? 300 : (full) ? 500 : 300}
                                                objectFit={'cover'}
                                                priority={true}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper> */}
                            <Image
                                src={process.env.NEXT_PUBLIC_DOMAIN + editImages[imageNumber]}
                                // alt={images[imageNumber].alt}
                                width={500}
                                height={500}
                                objectFit={'cover'}
                                priority={true}
                            />
                        </div>
                        <div className={productStyles['image-minies']}>
                            {editImages.map((editImage, i) => {
                                return (
                                    <Image
                                        className={cn(productStyles['image-mini'], {
                                            [productStyles['image-minies-active']]: imageNumber == i
                                        })}
                                        key={`imageProduct-${i}`}
                                        src={process.env.NEXT_PUBLIC_DOMAIN + editImage}
                                        // alt={image.alt}
                                        width={100}
                                        height={100}
                                        objectFit={'cover'}
                                        onClick={() => setImageNumber(i)}
                                    />);
                            })}
                        </div>
                    </>
                }

                {cart &&
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + editImages[0]}
                        // alt={images[0].alt}
                        width={100}
                        height={100}
                        objectFit={'cover'}
                        priority={true}
                    />
                }
            </>
        );
    };

    const overlayComponent = () => {
        return (
            <div
                className={styles.overlay}
                // onClick={(e) => e.stopPropagation()}
                onClick={(e) => e.preventDefault()}
            >
                <Button
                    appearance={"primary"}
                    onClick={() => setPopupActive({ isOpen: true, id: id })}
                >Выбрать фотографии
                </Button>
                <select
                    name="categories"
                    defaultValue={collectionId}
                    onChange={(e) => setEditCollectionId(e.target.value)}
                >
                    {allCollections.map((cat) => {
                        return (
                            <option
                                key={cat._id}
                                value={cat._id}
                            // selected={cat._id === collectionId}
                            >
                                {cat.name}
                            </option>
                        );
                    })}
                </select>
                <label className={styles.publish}>
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            setEditIsActive(e.target.checked);
                        }}
                        defaultChecked={isActive}
                    />
                    <span>Опубликовать</span>
                </label>
                <button
                    className={styles['update-btn']}
                    onClick={() => updateFn()}
                    disabled={!isEdited}
                >
                    Сохранить
                </button>
                <div className={styles.delete}>
                    <button
                        className={styles['delete-btn']}
                        onClick={() => deleteInit()}
                    >
                        Удалить
                    </button>
                    {deleteInitOn && <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: 0 }}
                        transition={{ duration: 2 }}
                        className={styles.process}>
                    </motion.div>
                    }
                    {/* {imgManagerIsOpen &&
                        <ImgManager
                            setIsOpen={setImgManagerIsOpen}
                            // setImages={setEditImages}
                            mode={'product'}
                            initChoosenImages={editImages}
                            setImagesFn={setImagesFn}
                        />} */}
                </div>
            </div>
        );
    };

    const updateFn = async () => {
        const dataForm = {
            _id: id,
            name: editName,
            collectionId: editCollectionId,
            price: editPrice,
            description: editDescription,
            isActive: editIsActive,
            images: JSON.stringify(editImages)
        };

        try {
            const { data, status } = await axios.post(API.products.update, dataForm, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (data) {
                // refreshFn();
                setIsEdited(false);
                refreshFn();
            }
        } catch (e) {
            console.log(e as Error);
        }
    };

    const deleteInit = () => {
        setDeleteInitOn(true);
        const timerId = setTimeout(() => setDeleteInitOn(false), 2000);
        if (deleteInitOn) {
            clearTimeout(timerId);
            deleteFn(id);
        }
    };

    return (
        <div className={cn(productStyles.wrapper, {
            [productStyles.min]: min,
            [productStyles.full]: full,
            [productStyles.cart]: cart
        })} {...props}>

            {min &&
                <>
                    <Link
                        href={{ pathname: `/admin/editshop/${collectionId}/${id}` }}>
                        <a className={productStyles.link}>
                            <div className={productStyles['img-wrapper']}>
                                {imageComponent()}
                                {overlayComponent()}
                            </div>
                            <div className={cn(productStyles['text-wrapper'])}>
                                <h4
                                    className={cn(
                                        productStyles.name,
                                        productStyles['name-min'],
                                        styles.name
                                    )}
                                    contentEditable
                                    suppressContentEditableWarning={true}
                                    onInput={(e) => setEditName((e.target as HTMLElement).innerText)}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {name}
                                </h4>
                                <span
                                    className={cn(productStyles.price,
                                        productStyles['price-min'],
                                    )}
                                >
                                    <span
                                        className={styles.price}
                                        contentEditable
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => setEditPrice(parseInt((e.target as HTMLElement).innerText))}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {price}
                                    </span>&nbsp;р
                                </span>
                            </div>
                        </a >
                    </Link>
                    <AddToCart appearance={'min'} productId={''} inCart={0} />
                </>
            }
            {full &&
                <>
                    <div className={cn(productStyles['img-wrapper'], productStyles['img-wrapper-full'])}>
                        {imageComponent()}
                        {overlayComponent()}
                    </div>
                    <div className={cn(productStyles['text-wrapper'], productStyles['text-wrapper-full'])}>
                        <h2
                            className={cn(
                                productStyles.name,
                                productStyles['name-full'],
                                styles.name
                            )}
                            contentEditable
                            suppressContentEditableWarning={true}
                            onInput={(e) => setEditName((e.target as HTMLElement).innerText)}
                            onClick={(e) => e.preventDefault()}
                        >
                            {name}
                        </h2>
                        <span
                            className={cn(productStyles.price,
                                productStyles['price-full'],

                            )}
                        >
                            Базовая цена
                            <span
                                className={styles.price}
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => setEditPrice(parseInt((e.target as HTMLElement).innerText))}
                                onClick={(e) => e.preventDefault()}

                            >
                                {price}
                            </span>
                            &nbsp;р
                        </span>
                        <Button appearance={'primary'}>Добавить параметр</Button>
                        <AddToCart
                            className={cn(productStyles['cart-button'], {
                                [productStyles['cart-button-full']]: min
                            })}
                            appearance={'full'}
                            productId={''}
                            inCart={0}
                        />
                        <div
                            className={cn(productStyles.description,
                                productStyles['description-full'],
                                styles.description
                            )}
                        >
                            {/* <pre
                                className={cn(productStyles.description,
                                    productStyles['description-full'],
                                    styles.description
                                )}
                                contentEditable
                                suppressContentEditableWarning={true}
                                onInput={(e) => setEditDescription(e.target.innerText)}
                                onClick={(e) => e.preventDefault()}
                            >
                                {description}
                            </pre> */}
                            {/* <Editor
                                editorState={editorState}
                                onChange={setEditorState}
                            // onInput={(e) => setEditDescription(e.target.innerText)}
                            /> */}
                            <TextEditor
                                className={styles['text-editor']}
                                setDesctriptionFn={setDesctriptionFn}
                                description={description}
                            />
                        </div>
                    </div>
                </>

            }
            <ImgManager
                id={id}
                inputType={'checkbox'}
                initChoosenImages={editImages}
                setImagesFn={setImagesFn}
                itemName={editName}
            />
            {/* {overlayComponent()} */}
            {/* editImages
            {editImages.map(img => {
                return (
                    <p>{img}</p>
                );
            })}
            initImageUrls
            {initImageUrls.map(img => {
                return (
                    <p>{img}</p>
                );
            })}
            imageNumber
            {imageNumber} */}
        </div >
    );
};