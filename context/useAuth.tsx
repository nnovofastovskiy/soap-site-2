import { useRouter } from "next/router";
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import * as sessionsApi from "../helpers/api/sessions";
import * as usersApi from "../helpers/api/users";
import * as cartApi from "../helpers/api/cart";
import { ICartItem } from "../interfaces/cart.interface";
import { User } from "../interfaces/user.interface";
import axios from "axios";
import { API } from "../helpers/api";

interface AuthContextType {
    // We defined the user type in `index.d.ts`, but it's
    // a simple object with email, name and password.
    user?: User,
    isAccount?: boolean,
    isAdmin?: boolean,

    loading: boolean,
    loadingInitial: boolean,
    error?: any,

    popupActive: { isOpen: boolean, id: string },
    setPopupActive: Dispatch<SetStateAction<{ isOpen: boolean, id: string }>>,

    // login: (email: string, password: string) => void,
    adminLogin: (email: string, password: string, wordv2: string) => void,
    // signUp: (email: string, name: string, password: string) => void,
    // logout: () => void,
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [user, setUser] = useState<User>();
    const [isAccount, setIsAccount] = useState<boolean>();
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const [popupActive, setPopupActive] = useState<{ isOpen: boolean, id: string }>({ isOpen: false, id: '' });
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    // const getCSRFToken = async () => {
    //     const { data } = await axios.get<{ csrfToken: string }>(API.auth.getCSRFToken);
    //     axios.defaults.headers.post["X-XSRF-TOKEN"] = data.csrfToken;
    // };

    const router = useRouter();
    // If we change page, reset the error state.
    useEffect(() => {
        if (error) setError(undefined);
    }, [router.pathname]);

    // Check if there is a currently active session
    // when the provider is mounted for the first time.
    //
    // If there is an error, it means there is no session.
    //
    // Finally, just signal the component that the initial load
    // is over.

    // async function refresh() {
    //     await getCSRFToken();
    //     const { isAccount } = await usersApi.checkIsAccount();
    //     setIsAccount(isAccount);
    //     const { isAdmin } = await usersApi.checkIsAdmin();
    //     setIsAdmin(isAdmin);
    // }

    // useEffect(() => {
    //     refresh()
    //         .then(() => {
    //             setLoadingInitial(false);
    //         });
    // }, []);


    // function login(email: string, password: string) {
    //     setLoading(true);
    //     getCSRFToken().then(() => {
    //         sessionsApi.login({ email, password })
    //             .then((user) => {
    //                 if (user.message) {
    //                     setIsAccount(false);
    //                     setError(user.message);
    //                 } else {
    //                     setIsAccount(true);
    //                     setPopupActive({ isOpen: false, id: 'loginForm' });
    //                     setUser(user);
    //                 }
    //             })
    //             .finally(() => setLoading(false));
    //     });
    // }

    function adminLogin(email: string, password: string, wordv2: string) {
        setLoading(true);

        sessionsApi.adminLogin({ email, password, wordv2 })
            .then(({ message }) => {
                if (message === "OK") {
                    setIsAdmin(true);
                    router.push("/admin");
                } else {
                    setIsAdmin(false);
                    setError(message);
                }
            })
            .finally(() => setLoading(false));
    }

    // Sends sign up details to the server. On success we just apply
    // the created user to the state.
    // function signUp(email: string, name: string, password: string) {
    //     setLoading(true);

    //     usersApi.signUp({ email, name, password })
    //         .then((user) => {

    //             setUser(user);
    //             router.push("/");
    //         })
    //         .catch((e) => setError(e))
    //         .finally(() => setLoading(false));
    // }

    // Call the logout endpoint and then remove the user
    // from the state.
    // function logout() {
    //     sessionsApi.logout().then(() => {
    //         setUser(undefined);
    //         setIsAccount(false);
    //         setIsAdmin(false);
    //         router.push('/');
    //     });
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
            user,
            isAccount,
            isAdmin,

            popupActive,
            setPopupActive,

            loading,
            loadingInitial,
            error,

            // login,
            adminLogin,
            // signUp,
            // logout,

        }),
        [user, isAccount, isAdmin, popupActive, loading, loadingInitial, error]
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
    return useContext(AuthContext);
}
