import cn from 'classnames';
import Link from 'next/link';
import React from 'react';
import { HeaderLinkProps } from "./HeaderLink.props";
import styles from './HeaderLink.module.css';

export const HeaderLink = ({ className, href, isActive, light = false, children, ...props }: HeaderLinkProps): JSX.Element => {
    return (
        <Link
            href={href}
            {...props}>
            <a
                className={cn(className, styles.link, {
                    [styles.active]: isActive,
                    [styles.light]: light
                })}
            >
                {children}
            </a>
        </Link >
    );
};