import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TabItemInterfase {
    id: string,
    text: string
    checked?: boolean | undefined,
    toggleBtnFunction?: any,
    toggleState?: boolean
}

export interface TabProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    withBtn?: boolean,
    items: TabItemInterfase[],
    changeHandler: Function,
    activeIndex: number
}