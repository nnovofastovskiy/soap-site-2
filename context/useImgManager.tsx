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
import axios from "axios";
import { API } from "../helpers/api";

interface ImgManagerContextType {
    // We defined the user type in `index.d.ts`, but it's
    // a simple object with email, name and password.
    loading: boolean,
    loadingInitial: boolean,
    error?: any,

    popupActive: { isOpen: boolean, id: string },
    setPopupActive: Dispatch<SetStateAction<{ isOpen: boolean, id: string }>>,

    login: (email: string, password: string) => void,
    adminLogin: (email: string, password: string, wordv2: string) => void,
    signUp: (email: string, name: string, password: string) => void,
    logout: () => void,
}

export const ImgManagerContext = createContext<ImgManagerContextType>(
    {} as ImgManagerContextType
);

// Export the provider as we need to wrap the entire app with it
export function ImgManagerProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [isAccount, setIsAccount] = useState<boolean>();
    const [isAdmin, setIsAdmin] = useState<boolean>();
    const [popupActive, setPopupActive] = useState<{ isOpen: boolean, id: string }>({ isOpen: false, id: '' });
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    const getCSRFToken = async () => {
        const { data } = await axios.get<{ csrfToken: string }>(API.auth.getCSRFToken);
        axios.defaults.headers.post["X-XSRF-TOKEN"] = data.csrfToken;
    };

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
            isAccount,
            isAdmin,

            popupActive,
            setPopupActive,

            loading,
            loadingInitial,
            error,


        }),
        []
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <ImgManagerContext.Provider value={memoedValue}>
            {children}
        </ImgManagerContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
    return useContext(AuthContext);
}
