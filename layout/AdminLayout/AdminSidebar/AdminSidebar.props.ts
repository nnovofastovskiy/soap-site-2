import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface AdminSidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode
}