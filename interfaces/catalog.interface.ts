import { IImage } from "./image.interface";

export interface ICategory {
    _id: string,
    name: string,
    image: IImage,
    description: string,
    products: []
}

export interface IProduct {
    _id: string,
    name: string,
    price: number,
    description: string,
    isActive: boolean,
    images: IImage[],
    collectionId: string,
    inCart?: number
}