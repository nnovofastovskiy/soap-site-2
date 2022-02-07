import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IBurgerItem {
    name: string,
    href: string,
    isAuth?: boolean,
    priority?: number,
    place: 'burger' | 'left' | 'right'
}

export interface BurgerProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    items: IBurgerItem[],
    light?: boolean,
}