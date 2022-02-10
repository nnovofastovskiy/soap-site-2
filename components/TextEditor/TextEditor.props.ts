import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TextEditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    description: string,
    setDesctriptionFn: (description: string) => void
}