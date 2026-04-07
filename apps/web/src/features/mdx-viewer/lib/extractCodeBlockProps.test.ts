import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { extractCodeBlockProps } from "./extractCodeBlockProps";

describe("extractCodeBlockProps", () => {
    it("extracts a fenced code block even when no language is provided", () => {
        const codeElement = createElement("code", null, "line one\nline two\n");

        expect(extractCodeBlockProps(codeElement)).toEqual({
            children: "line one\nline two\n",
            className: undefined,
        });
    });

    it("preserves the language class when one exists", () => {
        const codeElement = createElement("code", { className: "language-typescript" }, "const value = 1;\n");

        expect(extractCodeBlockProps(codeElement)).toEqual({
            children: "const value = 1;\n",
            className: "language-typescript",
        });
    });

    it("returns null for non-code content", () => {
        expect(extractCodeBlockProps("inline code")).toBeNull();
    });
});
