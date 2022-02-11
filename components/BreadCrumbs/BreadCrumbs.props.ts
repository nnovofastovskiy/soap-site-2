import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface BreadCrumbsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    items?: IRoute[]
}

export interface IRoute {
    path: string,
    text: string,
}