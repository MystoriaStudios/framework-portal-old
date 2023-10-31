/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-600": "#6C47FF",
                "primary-700": "#5639CC",
                "primary-50": "#F4F2FF",
                "success-700": "#027A48",
                "success-50": "#ECFDF3",
                darkmode: {
                    "primary": "#d657bc",
                    "secondary": "#3b8e00",
                    "accent": "#4464af",
                    "neutral": "#2a2d37",
                    "base-100": "#222e49",
                    "info": "#8599f4",
                    "success": "#56e6cc",
                    "warning": "#f48d1f",
                    "error": "#f70840",
                }
            },
        },
    },
}
    