import { DetailedHTMLProps, FormHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { ICategory } from "../AddCategory/AddCategory.interface";

export interface AddProductProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    categories: ICategory[],
    updateProducts: () => void
}