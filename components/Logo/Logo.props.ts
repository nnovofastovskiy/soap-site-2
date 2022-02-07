import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface LogoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    light: boolean
}