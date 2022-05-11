import { ImgManagerProps } from "./ImgManager.props";
import styles from './ImgManager.module.css';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from "react";
import { Button, DeleteBtn, Popup } from "../../components";
import axios from "axios";
import { API } from "../../helpers/api";
import Image from 'next/image';
import { IImageDb } from "../../interfaces/image.interface";
import useAuth from "../../context/useAuth";
import TrashIcon from '../../icons/Trash.svg';


interface IDeleteImage {
    name: string,
    path: string
}

export const ImgManager = ({ id, inputType, setImagesFn, initChoosenImages, itemName, ...props }: ImgManagerProps): JSX.Element => {

    const [isSuccsess, setIsSuccsess] = useState<boolean>(false);
    const [succsessMessage, setSuccsessMessage] = useState<string>();
    const [error, setError] = useState<string>();

    const [allImages, setAllImages] = useState<IImageDb[]>([]);
    const [choosenImages, setChoosenImages] = useState<string[]>(initChoosenImages);

    const { setPopupActive } = useAuth();
    const [imgDelete, setImgDelete] = useState<IDeleteImage>({ name: '', path: '' });

    const [imgSorting, setImgSorting] = useState('newBefore');

    useEffect(() => {
        // console.log('mount');
        getAllImages();
    }, []);

    useEffect(() => {
        setAllImages(sortImgs(allImages));
    }, [imgSorting]);

    const sortImgs = (imgs: IImageDb[]) => {
        switch (imgSorting) {
            case 'newBefore':
                return imgs.reverse();
            case 'oldBefore':
                return imgs;
            case 'name':
                return imgs.sort((a, b) => {
                    const nameA = a.i_fileName.toLocaleLowerCase();
                    const nameB = b.i_fileName.toLocaleLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
            case 'nameRevert':
                return imgs.sort((a, b) => {
                    const nameA = a.i_fileName.toLocaleLowerCase();
                    const nameB = b.i_fileName.toLocaleLowerCase();
                    if (nameA < nameB) return 1;
                    if (nameA > nameB) return -1;
                    return 0;
                });
            default:
                return imgs;
        }
    };

    const getAllImages = async () => {
        try {
            const { data } = await axios.get<IImageDb[]>(API.images.allImages);
            setAllImages(sortImgs(data));
        } catch (e) {
            console.log(e);
        }
    };

    const updateChoosenImages = (imgSrc: string, add: boolean) => {
        if (inputType === 'checkbox') {
            const index = choosenImages.indexOf(imgSrc);
            if (add) {
                const newArr = choosenImages.slice(0);
                newArr.push(imgSrc);
                setChoosenImages(newArr);
            } else {
                const piece1 = choosenImages.slice(0, index);
                const piece2 = choosenImages.slice(index + 1);
                const newArr = piece1.concat(piece2);
                setChoosenImages(newArr);
            }
        } else {
            setChoosenImages([imgSrc]);
        }
    };

    const popupHeader = () => {
        return (
            <div
                className={styles.header}
            >
                <label className={styles['upload-btn']}>
                    {/* <Button appearance="primary" onClick={e => e.preventDefault()}> */}
                    <input type="file" style={{ display: 'none' }} onChange={e => imgUpload(e)} />
                    <span>
                        Загрузить фотографию
                    </span>
                    {/* </Button> */}
                </label>
                <h4>
                    Выберите фотографии для {itemName}
                </h4>
                <select onChange={(e) => {
                    setImgSorting(e.target.value);
                    // sortImgs(allImages);
                }}>
                    <option value="newBefore" defaultChecked>Сначала новые</option>
                    <option value="oldBefore">Сначала старые</option>
                    <option value="name">По названию</option>
                    <option value="nameRevert">По названию обр</option>
                    {/* <option value="oldBefore">Сначала старые</option> */}
                </select>
            </div >
        );
    };

    const imgInput = (imgSrc: string, imgName: string, i: number) => {
        return (
            <div
                key={`img-${i}`}
                className={styles['img-wrapper']}
            >
                <label
                    key={`imgInput${i}`}
                >
                    <input
                        type={inputType}
                        onChange={(e) => updateChoosenImages(imgSrc, e.target.checked)}
                        checked={choosenImages.includes(imgSrc)}
                    />
                    <span
                        className={styles['choosen-number']}
                    >
                        {choosenImages.includes(imgSrc) && choosenImages.indexOf(imgSrc) + 1}
                    </span>
                    <Image
                        className={styles.img}
                        src={process.env.NEXT_PUBLIC_DOMAIN + imgSrc}
                        width={150}
                        height={150}
                        objectFit="cover"
                    />
                    <span
                        className={styles['img-name']}
                    >{imgName}
                    </span>
                </label>
                {/* <DeleteBtn deleteFn={() => deleteImg(imgName)} /> */}
                <Button
                    className={styles['img-delete-btn']}
                    appearance={"ghost"}
                    foo={async () => {
                        const data = await deleteImg(imgName);
                        updateChoosenImages(imgSrc, false);
                        await getAllImages();
                        return data;
                    }}
                    proove={true}
                    loading={true}
                    iconSvg={<TrashIcon />}
                >
                </Button>
            </div>
        );
    };

    const imgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        if (e.target.files) {
            const file = e.target.files[0];
            formData.append('imageFile', file);
        }

        try {
            const { data } = await axios.post<{ message: string }>(API.images.addProductImage, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data.message == 'product img file uploaded') {
                getAllImages();
                setIsSuccsess(true);
            } else {
                setError('Что то пошло не так');
            }
        } catch (e) {
            setError((e as Error).message);
        }

    };

    const deleteImg = async (imgName: string) => {
        // console.log('deleteImg', '.', imgName);

        try {
            const { data } = await axios.post<{ message: string }>(API.images.deleteOneImage, { fileName: imgName });
            if (data.message === `deleted:${imgName}`) {
                return 'ok';
            } else {
                return 'fault';
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Popup id={id} header={popupHeader()}>
            <section className={styles['imgs-wrapper']}>
                {allImages.map((img, i) => {
                    return (
                        imgInput(img.i_path, img.i_fileName, i)
                    );
                })}
            </section>
            <pre>
                {JSON.stringify(choosenImages, null, 4)}
            </pre>
            <Button
                appearance="primary"
                onClick={() => setImagesFn(choosenImages)}
            >
                Выбрать
            </Button>
        </Popup>
    );
};