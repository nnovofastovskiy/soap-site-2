import { DetailedHTMLProps, ParamHTMLAttributes, ReactNode } from "react";

export interface CartProps extends DetailedHTMLProps<ParamHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    items: number,
    light?: boolean
}