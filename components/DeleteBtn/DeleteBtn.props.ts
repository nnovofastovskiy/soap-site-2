import React, { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, HTMLAttributes, ReactNode } from "react";

export interface DeleteBtnProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    deleteFn: () => void
}