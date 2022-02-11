import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IImage } from '../../interfaces/image.interface';

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    apperience: 'min' | 'full' | 'cart',
    id: string,
    name: string,
    price: number,
    description: string,
    images: IImage[],
    categoryId: string,
}