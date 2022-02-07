import axios from "axios";
import { ICart, ICartItem } from "../../interfaces/cart.interface";
import { API } from "../api";

// export async function addToServerCart(productId: string): Promise<ICart> {
//     const response = await axios.post<ICart>(API.account.cart_add + productId);
//     return response.data;
// }

export async function sendCart(cartItems: ICartItem[]): Promise<ICart> {
    const { data } = await axios.post<ICart>(API.account.cart_send, { cartItems: cartItems });
    return data;
}

export async function getCart(): Promise<ICart> {
    const { data } = await axios.get<ICart>(API.account.cart_read);
    return data;
}

// export function mergeCart