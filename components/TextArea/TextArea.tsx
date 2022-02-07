import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import cn from 'classnames';
import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';

export const TextArea = forwardRef(({ className, placeholder, error, errorMessage, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    function inputFocuse(e: React.MouseEvent<HTMLSpanElement>): void {
        const target = e.target as HTMLSpanElement;
        const input = target.previousElementSibling as HTMLInputElement;
        input.focus();
    }

    return (
        <div className={styles.wrapper}>
            <textarea className={cn(className, styles.input, {
                [styles.error]: error
            })}
                ref={ref}
                {...props}
                placeholder=' '
            />
            <span
                className={styles.placeholder}
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => inputFocuse(e)}
            >
                {placeholder}
            </span>
            <span className={styles['error-message']}>{error && error.message}&nbsp;</span>
        </div>
    );
});