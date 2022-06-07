import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ShimmerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: ReactNode,
    tag?: 'div' | 'p'
}