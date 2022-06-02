import { IProduct } from "./catalog.interface";
import { IImage } from "./image.interface";

export interface ILocalCart {
    _id: string,
    collectionId?: string,
    name?: string,
    price?: number,
    images?: IImage[],
    count: number,
    isActive?: boolean
}

export interface IFullCart extends IProduct {
    count: number
}