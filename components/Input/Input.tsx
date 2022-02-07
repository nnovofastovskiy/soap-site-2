import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import React, { ForwardedRef, forwardRef, ReactNode, useEffect, useState } from 'react';

export const Input = forwardRef(({ className, placeholder, error, errorMessage, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    function inputFocuse(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
        const target = e.target as HTMLSpanElement;
        const input = target.previousElementSibling as HTMLInputElement;
        input.focus();
    }

    return (
        <div className={styles.wrapper}>
            <input className={cn(className, styles.input, {
                [styles.error]: error
            })}
                ref={ref}
                {...props}
                placeholder=' '
            // type={type}
            // autoComplete={type}
            />
            <span
                className={styles.placeholder}
                onClick={(e) => inputFocuse(e)}
            >
                {placeholder}
            </span>
            <span className={styles['error-message']}>{error && error.message}&nbsp;</span>
        </div>
    );
});