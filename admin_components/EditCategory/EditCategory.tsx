import { EditCategoryProps } from './EditCategory.props';
import categoryStyles from '../../components/Category/Category.module.css';
import styles from './EditCategory.module.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { ImgManager } from '..';
import axios from 'axios';
import { API } from '../../helpers/api';
import { motion } from 'framer-motion';
import { IImage } from '../../interfaces/image.interface';
import Link from 'next/link';



export const EditCategory = ({ id, name, description, image, deleteFn, refreshFn, className, ...props }: EditCategoryProps): JSX.Element => {
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);
    const [editDescription, setEditDescription] = useState<string>(description);
    const [editImage, setEditImage] = useState<string[]>([image.url]);
    const [deleteInitOn, setDeleteInitOn] = useState<boolean>(false);
    const [imgManagerIsOpen, setImgManagerIsOpen] = useState<boolean>(false);

    const overlayComponent = () => {
        return (
            <div
                className={styles.overlay}
                onClick={(e) => e.preventDefault()}
            >
                <button
                    onClick={() => setIsOpenFn(true)}
                >
                    Выбрать фотографию
                </button>
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
                </div>
            </div>
        );
    };

    const setIsOpenFn = (state: boolean) => {
        setImgManagerIsOpen(state);
        console.log('govno');

    };

    const setImageFn = (images: string[]) => {
        setEditImage(images);
    };

    useEffect(() => {
        setIsEdited((editName != name) ||
            (editDescription != description) ||
            (editImage[0] != image.url)
        );
    }, [editName, editDescription, editImage]);

    const updateFn = async () => {
        const dataForm = {
            _id: id,
            name: editName,
            description: editDescription,
            image: editImage[0]
        };

        try {
            const { data, status } = await axios.post(API.collections.update, dataForm, {
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
        setTimeout(() => setDeleteInitOn(false), 2000);
        if (deleteInitOn) {
            deleteFn(id);
        }
    };


    return (
        <div className={cn(className, categoryStyles.wrapper, styles.wrapper)} {...props}>
            <Link
                href={`/admin/editshop/${id}`}
            >
                <a className={categoryStyles.link}>
                    {/* editName:  {editName} */}
                    <div className={styles['img-wrapper']}>
                        <Image
                            src={process.env.NEXT_PUBLIC_DOMAIN + editImage[0]}
                            // alt={editImage[0]}
                            width={500}
                            height={300}
                            // layout="responsive"
                            objectFit={'cover'}
                        />
                    </div>
                    <h4
                        className={cn(categoryStyles.name, styles.name)}
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(e) => setEditName((e.target as HTMLElement).innerText)}
                        onClick={(e) => e.preventDefault()}
                    >
                        {name}
                    </h4>
                    <p
                        className={styles.description}
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(e) => setEditDescription((e.target as HTMLElement).innerText)}
                        onClick={(e) => e.preventDefault()}
                    >
                        {description}
                    </p>
                    {overlayComponent()}
                </a>
            </Link>
            {imgManagerIsOpen &&
                <ImgManager
                    setIsOpenFn={setIsOpenFn}
                    // setImages={setEditImage}
                    inputType={'radio'}
                    initChoosenImages={editImage}
                    setImagesFn={setImageFn}
                />}
        </div>
    );
};