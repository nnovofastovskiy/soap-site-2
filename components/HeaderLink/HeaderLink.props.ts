import { DetailedHTMLProps, ParamHTMLAttributes, ReactNode } from "react";

export interface HeaderLinkProps extends DetailedHTMLProps<ParamHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    href: string,
    isActive: boolean,
    light?: boolean,
    children?: ReactNode
}