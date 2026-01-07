"use client";

import { MDXEditor, type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor';
import { forwardRef } from 'react';

const InitializedMDXEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => {
    return <MDXEditor {...props} ref={ref} />;
});

InitializedMDXEditor.displayName = 'InitializedMDXEditor';

export default InitializedMDXEditor;
