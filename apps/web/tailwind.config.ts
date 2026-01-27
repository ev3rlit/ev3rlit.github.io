import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                indigo: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
                pink: {
                    400: '#f472b6',
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "dot-pattern": "radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)",
                "dot-pattern-dark": "radial-gradient(circle, #475569 1.5px, transparent 1.5px)",
            },
            boxShadow: {
                'prism': '0 8px 30px rgb(0 0 0 / 0.12)',
                'prism-dark': '0 8px 30px rgb(0 0 0 / 0.5)',
            },
            backgroundSize: {
                "dot": "32px 32px",
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        function ({ addComponents }: { addComponents: any }) {
            addComponents({
                '.glass-prism': {
                    '@apply bg-gradient-to-br from-white/95 to-white/80 dark:from-stone-900/95 dark:to-stone-900/80 backdrop-blur-xl border border-white/40 dark:border-stone-800/40 shadow-prism dark:shadow-prism-dark ring-1 ring-white/40 dark:ring-white/5': {},
                },
            })
        }
    ],
};
export default config;
