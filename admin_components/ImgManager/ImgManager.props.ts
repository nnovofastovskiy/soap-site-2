import { Dispatch } from "react";
import { IImage } from "../../interfaces/image.interface";

export interface ImgManagerProps {
    initChoosenImages: string[],
    setImagesFn: (images: string[]) => void,
    inputType: 'radio' | 'checkbox',
    itemName?: string,
    id: string
}