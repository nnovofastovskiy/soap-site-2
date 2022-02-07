import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IImage } from '../../interfaces/image.interface';

export interface EditCategoryProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    id: string,
    name: string,
    description: string,
    image: IImage,
    deleteFn: (id: string) => void,
    refreshFn: () => void,
}