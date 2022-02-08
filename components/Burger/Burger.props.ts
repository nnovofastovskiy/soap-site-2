import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { IHeaderItem } from "../../interfaces/menuItem.interface";

export interface BurgerProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    items: IHeaderItem[],
    light?: boolean,
}