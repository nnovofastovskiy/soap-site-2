import { TextEditorProps } from './TextEditor.props';
import styles from './TextEditor.module.css';
import { ContentState, convertFromHTML, Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import cn from 'classnames';

export const TextEditor = ({ className, setDesctriptionFn, description, ...props }: TextEditorProps): JSX.Element => {
    const blocksFromHTML = convertFromHTML(description);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(state)
    );

    useEffect(() => {
        setDesctriptionFn(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    }, [editorState]);

    const _onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };
    const _onItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    };
    const _onUlClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    };

    return (
        <div className={cn(className, styles.wrapper)}>
            <button onClick={_onBoldClick}>BOLD</button>
            <button onClick={_onItalicClick}>ITALIC</button>
            <button onClick={_onUlClick}>UL</button>
            <Editor editorState={editorState} onChange={setEditorState} />
        </div>
    );
};
