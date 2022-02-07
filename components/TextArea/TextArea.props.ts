import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    error?: FieldError,
    placeholder?: string,
    errorMessage?: string
    // type?: 'email' | 'password'
}