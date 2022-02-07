import { DetailedHTMLProps, FormHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface AddCategoryProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    updateCategories: () => void
}