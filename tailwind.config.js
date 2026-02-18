/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#18181b", // Zinc-950 (Black-ish)
                secondary: "#10B981", // Emerald Green
                accent: "#34D399", // Emerald-400
                background: "#FAFAFA", // Neutral-50
                surface: "#FFFFFF",
                dark: {
                    bg: "#09090b", // Zinc-950
                    surface: "#18181b" // Zinc-900
                }
            },
            backgroundSize: {
                '300%': '300%',
            },
            animation: {
                gradient: 'gradient 8s linear infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        'background-position': '0% 50%',
                    },
                    '50%': {
                        'background-position': '100% 50%',
                    },
                },
            },
        },
    },
    plugins: [],
}
