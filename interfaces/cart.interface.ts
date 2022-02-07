import { IProduct } from "./catalog.interface";

export interface ICartItem {
    productId: string,
    count: number
}

export interface ICart {
    cartItems: ICartItem[]
}

export interface IFullCart extends IProduct {
    count: number
}