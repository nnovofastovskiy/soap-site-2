import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IProduct } from "../../interfaces/catalog.interface";

export interface ProductsWrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {
    products: IProduct
}