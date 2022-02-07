import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: FieldError,
    placeholder?: string,
    errorMessage?: string
    // type?: 'email' | 'password'
}