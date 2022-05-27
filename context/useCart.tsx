import router, { useRouter } from "next/router";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import * as cartApi from "../helpers/api/cart";
import { ICartItem, IFullCart } from "../interfaces/cart.interface";
import axios from "axios";
import { API } from "../helpers/api";
import useAuth from "./useAuth";
import { IProduct } from "../interfaces/catalog.interface";

interface CartContextType {
    localCart: ICartItem[],
    loading: boolean,
    loadingInitial: boolean,
    error?: any,

    addToCart: (productId: string, count: number) => Promise<ICartItem[] | undefined>,
    clearCart: () => Promise<"ok" | undefined>,
    fullCart: IFullCart[],
    fullPrice: number,
    count: number
}



export const CartContext = createContext<CartContextType>(
    {} as CartContextType
);

// Export the provider as we need to wrap the entire app with it
export function CartProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    const [localCart, setLocalCart] = useState<ICartItem[]>([]);

    const [fullCart, setFullCart] = useState<IFullCart[]>([]);
    const [fullPrice, setFullPrice] = useState<number>(0);
    const [count, setCount] = useState(0);


    // const getCSRFToken = async () => {
    //     const { data } = await axios.get<{ csrfToken: string }>(API.auth.getCSRFToken);
    //     axios.defaults.headers.post["X-XSRF-TOKEN"] = data.csrfToken;
    // };

    useEffect(() => {
        // getCSRFToken();
        refresh();
    }, []);

    useEffect(() => {
        getFullCart();
    }, []);

    // const router = useRouter();
    // If we change page, reset the error state.
    // useEffect(() => {
    //     if (error) setError(undefined);
    // }, [router.pathname]);

    // Check if there is a currently active session
    // when the provider is mounted for the first time.
    //
    // If there is an error, it means there is no session.
    //
    // Finally, just signal the component that the initial load
    // is over.

    async function refresh() {
        // await getCSRFToken();
        const localCart = getLocalCart();
        setLocalCart(localCart);
        getFullCart();
        // if (fullCart)
        // getFullPrice(fullCart);
        const count = fullCart.reduce((acc, item) => {
            if (item.isActive)
                return acc + item.count;
            else
                return acc
        }, 0);
        setCount(count);
    }

    function getLocalCart(): ICartItem[] {
        const localCart = localStorage.getItem('cartItems');
        if (localCart) {
            const ls_data = localStorage.getItem('cartItems');
            if (ls_data) {
                const cartItems = JSON.parse(ls_data);
                return cartItems;
            } else {
                return [];
            }
        }
        return [];
    }

    async function addToCart(productId: string, count: number) {

        if (localCart && localCart.length) {
            const items: ICartItem[] = localCart.slice();
            for (let i = 0; i < items.length; i++) {
                if (items[i].productId === productId) {
                    items[i].count += count;
                    if (items[i].count == 0) {
                        items.splice(i, 1);
                    }
                    break;
                } else {
                    if ((i == items.length - 1) && (count > 0)) {
                        items.push({ productId: productId, count: count });
                        break;
                    }
                }
            }
            setLocalCart(items);
            localStorage.setItem('cartItems', JSON.stringify(items));
            return items;
        } else {
            if (count < 0) return;
            const items = [{ productId: productId, count: count }];
            setLocalCart(items);
            localStorage.setItem('cartItems', JSON.stringify(items));
            return items;
        }

    }

    const getFullCart = async () => {
        const cartProducts = localCart.map(item => item.productId);
        const arrIds = {
            arrIds: cartProducts
        };

        const { data } = await axios.post<IProduct[]>(API.products.getByArrIds, arrIds);

        const fullCart: IFullCart[] = data.map(productItem => {
            const count = localCart.filter(сartItem => сartItem.productId === productItem._id)[0].count;
            const fullItem: IFullCart = { ...productItem, count: count };
            return fullItem;
        });
        setFullCart(fullCart);
        getFullPrice(fullCart);
    };

    const getFullPrice = (cart: IFullCart[]) => {
        let fullPrice = 0;
        const activeProducts = cart.filter(item => { if (item.isActive) return item });
        activeProducts.forEach(item => {
            fullPrice += item.price * item.count;
        });
        setFullPrice(fullPrice);
    };

    const clearCart = async () => {
        try {
            setLocalCart([]);
            localStorage.setItem('cartItems', JSON.stringify([]));
            return ("ok");
        } catch (error) {

        }
    };

    // Make the provider update only when it should.
    // We only want to force re-renders if the user,
    // loading or error states change.
    //
    // Whenever the `value` passed into a provider changes,
    // the whole tree under the provider re-renders, and
    // that can be very costly! Even in this case, where
    // you only get re-renders when logging in and out
    // we want to keep things very performant.
    const memoedValue = useMemo(
        () => ({
            localCart,
            loading,
            loadingInitial,
            error,

            addToCart,
            clearCart,

            fullCart,
            fullPrice,
            count
        }),
        [localCart, loading, loadingInitial, error]
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <CartContext.Provider value={memoedValue}>
            {children}
        </CartContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useCart() {
    return useContext(CartContext);
}
