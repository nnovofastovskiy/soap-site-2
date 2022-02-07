import axios from "axios";
import { API } from "../api";
import { User } from "../../interfaces/user.interface";

export async function adminLogin(params: {
    email: string,
    password: string,
    wordv2: string
}): Promise<User> {
    const response = await axios.post<User>(API.auth.adminLogin, params);
    return response.data;
}

export async function login(params: {
    email: string;
    password: string;
}): Promise<User> {
    const response = await axios.post<User>(API.auth.login, params);
    return response.data;
}

export async function logout() {
    const response = await axios.get<User>(API.auth.logout);

    return response.data;
}