import { AxiosResponse } from 'axios';
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    appearance: 'primary' | 'secondary' | 'ghost',
    children?: ReactNode,
    foo?: () => Promise<"ok" | "fault" | undefined>,
    loading?: boolean,
    proove?: boolean,
    iconSvg?: any
}