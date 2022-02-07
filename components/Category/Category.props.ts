import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IImage } from '../../interfaces/image.interface';

export interface CategoryProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    id: string,
    name: string,
    description: string,
    image: IImage,
}