import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LoadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    theme: 'light' | 'dark'
}