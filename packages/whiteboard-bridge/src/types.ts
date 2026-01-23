export interface ThemeInterface {
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: string) => void;
}

export interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}
