import { ImgManagerProps } from "./ImgManager.props";
import styles from './ImgManager.module.css';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from "react";
import { Button, Popup, Tab } from "../../components";
import axios from "axios";
import { API } from "../../helpers/api";
import { TabItemInterfase } from "../../components/Tab/Tab.props";
import Image from 'next/image';
import { IImage, IImageDb } from "../../interfaces/image.interface";
import { useForm } from 'react-hook-form';
import useAuth from "../../context/useAuth";

const tabItems: TabItemInterfase[] = [
    {
        id: 'imgTab',
        text: 'Все',
        checked: true
    },
    {
        id: 'imgTab',
        text: 'Категории',
    },
    {
        id: 'imgTab',
        text: 'Продукты',
    },
];


interface IAltUpdateForm {
    i_alt: string,
    i_path: string
}


export const ImgManager = ({ setIsOpenFn, mode, setImagesFn, initChoosenImages, ...props }: ImgManagerProps): JSX.Element => {

    const [isSuccsess, setIsSuccsess] = useState<boolean>(false);
    const [succsessMessage, setSuccsessMessage] = useState<string>();
    const [error, setError] = useState<string>();

    const [allImages, setAllImages] = useState<IImageDb[]>([]);
    const [productImages, setProductImages] = useState<IImageDb[]>([]);
    const [categoryImages, setCategoryImages] = useState<IImageDb[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [choosenImages, setChoosenImages] = useState<string[]>(initChoosenImages);
    const [iType, setIType] = useState<string>('');

    const { popupActive, setPopupActive } = useAuth();
    const [imgDelete, setImgDelete] = useState('');

    const wrapperRef = useRef<HTMLDivElement>(null);


    const deletePopup = () => {
        return (
            <>
                <span>Точно удалить?</span>
                <Button
                    appearance={"primary"}
                    onClick={() => deleteImage(imgDelete).then(() => {
                        setPopupActive(false);
                    })}
                >
                    Удалить
                </Button>
                <Button
                    appearance={"secondary"}
                    onClick={() => {
                        setPopupActive(false);
                    }}
                >
                    Не удалять
                </Button>
            </>
        );
    };


    const deleteImage = async (imgName: string) => {
        const formData = new FormData();
        formData.append('fileName', imgName);
        console.log(formData);

        try {
            axios.post(API.images.deleteOneImage, { fileName: imgName })
                .then(() => {
                    getAllImages();
                    getProductImages();
                    getCategoryImages();
                });
        } catch (e) {
            console.log(e as Error);
        }
    };

    const imagesRender = (images: IImageDb[]): JSX.Element => {
        const updateAlt = async (i_path: string, e: React.FormEvent<HTMLFormElement>) => {
            const target = e.target as HTMLFormElement;
            const input = target.querySelector('input');
            if (input) {
                const i_alt = input.value;
                try {
                    axios.post(API.images.updateAlt, { i_path: i_path, i_alt: i_alt })
                        .then(() => {
                            getAllImages();
                            getProductImages();
                            getCategoryImages();
                        });
                } catch (e) {
                    console.log(e as Error);
                }
            }
            e.preventDefault();
        };

        return (
            <>
                {images?.map((image: IImageDb, i) => {
                    return (
                        <div key={`wrapper-${i}`}>
                            <label key={`image-${i}`} htmlFor={image.i_fileName}>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { updateChoosenImages(e); }}
                                    type={iType}
                                    name="images"
                                    id={image.i_fileName}
                                    data-path={image.i_path}
                                    defaultChecked={choosenImages.indexOf(image.i_path) > -1}
                                />
                                <span>
                                    {choosenImages.indexOf(image.i_path) > -1 && choosenImages.indexOf(image.i_path) + 1}
                                </span>
                                <Image
                                    src={process.env.NEXT_PUBLIC_DOMAIN + image.i_path}
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                />
                                <span>{image.i_fileName}</span>
                            </label>
                            {/* <button type='button' onClick={() => deleteImage(image.i_fileName)}>X</button> */}
                            <button
                                type='button'
                                onClick={() => {
                                    setPopupActive(true);
                                    setImgDelete(image.i_fileName);
                                }}
                            >
                                X
                            </button>
                            <form
                                key={`form-${i}`}
                                onSubmit={(e: React.FormEvent<HTMLFormElement>) => updateAlt(image.i_path, e)}
                            >
                                <input
                                    type="text"
                                    name="i_alt"
                                    defaultValue={image.i_alt}
                                />
                                {/* <input
                                    type="text"
                                    defaultValue={image.i_path}
                                    disabled
                                    style={{ display: 'none' }}
                                /> */}

                                <button>OK</button>
                            </form>
                        </div>
                    );
                })
                }
            </>
        );
    };

    // функция получения всех картинок с сервера
    const getAllImages = async () => {
        try {
            axios.get<IImageDb[]>(API.images.allImages)
                .then(({ data, status }) => {
                    if (status == 200) {
                        setAllImages(data);
                        console.log('all images', data);
                        console.log('init choosen images', initChoosenImages);
                        
                        const checkImages: string[] = [];
                        initChoosenImages.forEach(image => {
                            if (data.map(item => item.i_path).indexOf(image) < 0) {
                                null;
                            } else {
                                checkImages.push(image);
                            }
                        });
                        console.log('checkImages', checkImages);

                        setChoosenImages(checkImages);
                    }
                })
                .catch((e) => {
                    console.log(e as Error);
                });
        } catch (e) {
            console.log(e as Error);
        }
    };

    // функция получения картинок продуктов с сервера
    const getProductImages = async () => {
        try {
            axios.get<IImageDb[]>(API.images.allProductImages)
                .then(({ data, status }) => {
                    if (status == 200) {
                        setProductImages(data);
                    }
                })
                .catch((e) => {
                    console.log(e as Error);
                });
        } catch (e) {
            console.log(e as Error);
        }
    };

    // функция получения картинок категорий с сервера
    const getCategoryImages = async () => {
        try {
            axios.get<IImageDb[]>(API.images.allCollectionImages)
                .then(({ data, status }) => {
                    if (status == 200) {
                        setCategoryImages(data);
                    }
                })
                .catch((e) => {
                    console.log(e as Error);
                });
        } catch (e) {
            console.log(e as Error);
        }
    };

    // в зависимости от вкладки (категории или продукты) установить тип инпутов в менеджере картинок
    useEffect(() => {
        if (mode == "category") {
            setIType("radio");
        } else {
            setIType("checkbox");
        }
        // получить все картинки с сервера
        getAllImages();
        getCategoryImages();
        getProductImages();
    }, []);

    // функция обновления стейта выбранных картинок
    const updateChoosenImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.dataset.path;
        // console.log(value);
        if (value) {
            if (iType == "checkbox") {
                const index = choosenImages.indexOf(value);
                const choosenSrcs = choosenImages.splice(0);
                if (index == -1) {
                    choosenSrcs.push(value);
                    setChoosenImages(choosenSrcs);
                } else if (index > 0 && target.checked) {
                    // choosenSrcs = [...choosenSrcs.slice(0, index), ...choosenSrcs.slice(index)]
                    const piece1 = choosenSrcs.slice(0, index);
                    const piece2 = choosenSrcs.slice(index + 1);
                    // console.log(piece1);
                    // console.log(piece2);

                    setChoosenImages(piece1.concat(piece2));
                }
                // console.log('choosenSrcs', choosenSrcs);
            } else if (iType == "radio") {
                setChoosenImages([value]);
            }
        }
    };
    // const updateChoosenImages = () => {
    //     const wrapper: HTMLElement | null = wrapperRef.current;
    //     if (wrapper) {
    //         const inputs: NodeListOf<HTMLInputElement> = wrapper?.querySelectorAll('input');
    //         const choosenSrcs: string[] = [];
    //         inputs.forEach((input) => {
    //             if (input.checked) {
    //                 const path = input.dataset.path;
    //                 if (path) {
    //                     choosenSrcs.push(path);
    //                 }
    //             }
    //         });
    //         setChoosenImages(choosenSrcs);
    //         // console.log(choosenSrcs);
    //     }
    // };

    const submit = () => {
        console.log('sumbit');
        setImagesFn(choosenImages);
        setIsOpenFn(false);
    };

    const imgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        if (e.target.files) {
            const file = e.target.files[0];
            formData.append('imageFile', file);
        }

        try {
            if (mode == 'category') {
                const { data } = await axios.post<{ message: string }>(API.images.addCollectionImage, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (data.message == 'collection img file uploaded') {
                    getAllImages();
                    getCategoryImages();
                    getProductImages();
                    setIsSuccsess(true);
                } else {
                    setError('Что то пошло не так');
                }
            } else if (mode == 'product') {
                const { data } = await axios.post<{ message: string }>(API.images.addProductImage, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (data.message == 'product img file uploaded') {
                    getAllImages();
                    getCategoryImages();
                    getProductImages();
                    setIsSuccsess(true);
                } else {
                    setError('Что то пошло не так');
                }
            }
        } catch (e) {
            setError((e as Error).message);
        }

    };

    const getCSRFToken = async () => {
        const { data } = await axios.get<{ csrfToken: string }>(API.auth.getCSRFToken);
        axios.defaults.headers.post["X-XSRF-TOKEN"] = data.csrfToken;
    };

    useEffect(() => {
        getCSRFToken();
    }, []);

    return (
        <div className={styles.wrapper} onClick={() => setIsOpenFn(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <label className={styles.upload} htmlFor="imgInput">
                        <input
                            onChange={imgUpload}
                            type="file"
                            name="imageFile"
                            id="imgInput"

                        />
                        <span >Загрузить фотографию</span>
                    </label>

                    <Tab items={tabItems} changeHandler={setActiveIndex} activeIndex={activeIndex} />

                    <button
                        type="button"
                        onClick={() => setIsOpenFn(false)}
                    >
                        X
                    </button>
                </div>
                <div className={styles['img-wrapper']} ref={wrapperRef}>
                    {(activeIndex == 0) && imagesRender(allImages)}
                    {(activeIndex == 1) && imagesRender(categoryImages)}
                    {(activeIndex == 2) && imagesRender(productImages)}
                </div>
                <Button
                    appearance="primary"
                    onClick={submit}
                    type="button"
                    disabled={choosenImages.length == 0}
                >
                    Выбрать
                </Button>
            </div>
            <Popup>
                {deletePopup()}
            </Popup>
        </div>
    );
};