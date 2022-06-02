import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ILocalCart, IFullCart } from "../interfaces/cart.interface";
import axios from "axios";
import { API } from "../helpers/api";
import { IProduct } from "../interfaces/catalog.interface";

interface CartContextType {
    localCart: ILocalCart[],
    // fullCart: IFullCart[],

    addToCart: (productId: string, count: number) => ILocalCart[] | undefined,
    clearCart: () => Promise<"ok" | undefined>,
    // removeFromCart: (productId: string) => Promise<"ok" | undefined>,
    fullPrice: number,
    fullCount: number,
    refresh: () => Promise<ILocalCart[] | undefined>
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
    const [localCart, setLocalCart] = useState<ILocalCart[]>([]);
    // const [fullCart, setFullCart] = useState<IFullCart[]>([]);
    const [fullPrice, setFullPrice] = useState<number>(0);
    const [fullCount, setFullCount] = useState(0);

    useEffect(() => {
        refresh();
    }, []);

    // Check if there is a currently active session
    // when the provider is mounted for the first time.
    //
    // If there is an error, it means there is no session.
    //
    // Finally, just signal the component that the initial load
    // is over.

    const getFullPrice = (localCart: ILocalCart[]) => {
        const price = localCart.reduce((acc, item) => {
            if (item.isActive && item.price)
                return acc + item.price * item.count;
            else
                return acc;
        }, 0);
        setFullPrice(price);
    }

    function getCount(localCart: ILocalCart[]) {
        const count = localCart.reduce((acc, item) => {
            if (item.isActive)
                return acc + item.count;
            else
                return acc;
        }, 0);
        setFullCount(count);
    }

    async function refresh() {
        console.log('refresh');
        const localCart = localCartFromLs();

        if (localCart.length) {
            const cartProducts = localCart.map(item => item._id);
            const arrIds = {
                arrIds: cartProducts
            };
            const { data } = await axios.post<IProduct[]>(API.products.getByArrIds, arrIds);
            // console.log(data);

            if (data) {
                const refreshCart: ILocalCart[] = [];
                localCart.forEach(item => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id === item._id) {
                            item.collectionId = data[i].collectionId;
                            item.images = data[i].images;
                            item.name = data[i].name;
                            item.isActive = data[i].isActive;
                            item.price = data[i].price;
                            refreshCart.push(item);
                        } else {
                            console.log('delete');
                        }
                    }
                });
                localCartToLs(refreshCart);
                setLocalCart(refreshCart);
                getCount(refreshCart);
                getFullPrice(refreshCart);
                return refreshCart;
            }
        }
    }

    const localCartToLs = (cart: ILocalCart[]) => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    const localCartFromLs = (): ILocalCart[] => {
        const localCart = localStorage.getItem('cartItems');
        if (localCart) {
            const cartItems = JSON.parse(localCart);
            setLocalCart(cartItems);
            return cartItems;
        } else {
            return [];
        }
    }

    function addToCart(productId: string, count: number) {
        console.log('addToCart');

        if (!localCart.length) {
            if (count > 0) {
                const cart: ILocalCart[] = [{ _id: productId, count: 1, isActive: true }]
                localCartToLs(cart);
                setLocalCart(cart);
                getCount(cart);
                getFullPrice(cart);
                return cart;
            }
        } else {
            const cart: ILocalCart[] = localCart.slice();
            for (let i = 0; i < cart.length; i++) {
                // console.log('for');

                if (cart[i]._id === productId) {
                    const newCount = cart[i].count += count;
                    // console.log(newCount);
                    if (newCount) {
                        cart[i].count = newCount;
                        localCartToLs(cart);
                        setLocalCart(cart);
                        getCount(cart);
                        getFullPrice(cart);
                        return cart;
                    } else {
                        console.log('remove');

                        const newCart: ILocalCart[] = [...cart.slice(0, i), ...cart.slice(i + 1)];
                        localCartToLs(newCart);
                        setLocalCart(newCart);
                        getCount(newCart);
                        getFullPrice(newCart);
                        return newCart;
                    }
                } else {
                    if (i == cart.length - 1) {
                        const newItem: ILocalCart = {
                            _id: productId,
                            count: 1,
                            isActive: true
                        }
                        cart.push(newItem);
                        localCartToLs(cart);
                        setLocalCart(cart);
                        getCount(cart);
                        getFullPrice(cart);
                        return cart;
                    }
                }
            }

        }
    }

    const clearCart = async () => {
        try {
            setLocalCart([]);
            localStorage.setItem('cartItems', JSON.stringify([]));
            return ("ok");
        } catch (error) {

        }
    };

    // const removeFromCart = async (id: string) => {

    //     try {

    //     }
    // }

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
            // fullCart,

            addToCart,
            clearCart,
            // removeFromCart,

            fullPrice,
            fullCount,
            refresh
        }),
        [localCart, fullCount, fullPrice]
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
