import { Children, isValidElement, type ReactNode } from "react";

export interface ExtractedCodeBlockProps {
    children: string;
    className?: string;
}

export function extractCodeBlockProps(children: ReactNode): ExtractedCodeBlockProps | null {
    const [firstChild] = Children.toArray(children);

    if (!isValidElement(firstChild)) {
        return null;
    }

    const code = firstChild.props?.children;

    if (typeof code !== "string") {
        return null;
    }

    return {
        children: code,
        className: typeof firstChild.props?.className === "string" ? firstChild.props.className : undefined,
    };
}
