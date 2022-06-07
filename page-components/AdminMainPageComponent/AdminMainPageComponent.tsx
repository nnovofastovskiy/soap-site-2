import { AdminMainPageComponentProps } from "./AdminMainPageComponent.props";
import styles from './AdminMainPageComponent.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../helpers/api";

export const AdminMainPageComponent = ({ }: AdminMainPageComponentProps): JSX.Element => {
    const [contacts, setContacts] = useState();

    useEffect(() => {
        const { data } = axios.get(API.contacts.read);
        console.log('data:', data);

    }, []);

    return (
        <>
            Главная страница админки
        </>
    );
};