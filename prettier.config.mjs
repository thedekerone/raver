/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    tabWidth: 4,
    overrides: [
        {
            files: "*.{ts,tsx}",
            options: {
                // Your specific options for TypeScript and TSX files
            },
        },
    ],
};

export default config;

