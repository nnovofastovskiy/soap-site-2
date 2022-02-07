import { IImage } from "../../interfaces/image.interface";

export interface IAddCategoryForm {
    name: string,
    description: string,
    image: string[]
}

export interface IAddCategoryRes {
    message: string
}

export interface ICategory {
    _id: string,
    name: string,
    image: IImage,
    description: string,
    products: []
}