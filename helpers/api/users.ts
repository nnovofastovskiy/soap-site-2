import axios from "axios";
import { API } from "../api";
import { User } from "../../interfaces/user.interface";

export async function getCurrentUser(): Promise<User> {
    const response = await axios.get<User>(API.account.getMeta);
    return response.data;
}

export async function checkIsAccount(): Promise<{ isAccount: boolean }> {
    const response = await axios.get<{ isAccount: boolean }>(API.auth.checkIsAuth);
    return response.data;
}

export async function checkIsAdmin(): Promise<{ isAdmin: boolean }> {
    const response = await axios.get<{ isAdmin: boolean }>(API.auth.checkIsAdm);
    return response.data;
}

export async function signUp(params: {
    email: string;
    name: string;
    password: string;
}): Promise<User> {
    const response = await axios.post<User>(API.auth.register, params);
    return response.data;
}