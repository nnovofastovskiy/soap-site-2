import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IImage } from '../../interfaces/image.interface';
import { ICategory } from '../AddCategory/AddCategory.interface';

export interface EditProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    apperience: 'min' | 'full' | 'cart',
    id: string,
    name: string,
    price: number,
    isActive: boolean,
    description: string,
    images: IImage[],
    deleteFn: (id: string) => void,
    collectionId: string,
    allCollections: ICategory[]
    refreshFn: () => void,
}