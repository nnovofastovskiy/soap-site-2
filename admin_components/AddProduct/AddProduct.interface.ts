import { IImage } from "../../interfaces/image.interface";

export interface IAddProductForm {
    name: string,
    collectionId: string,
    price: number,
    description: string,
    isActive: boolean,
    images: string[]
}

export interface IAddProductRes {
    message: string
}

export interface IProduct {
    _id: string,
    name: string,
    price: number,
    description: string,
    isActive: boolean,
    images: IImage[],
    collectionId: string
}
