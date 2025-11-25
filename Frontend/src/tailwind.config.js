/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {extend: {
                colors: {
                    primary: "#2D6CDF",
                    secondary: "#F4A100",
                },
            }
            ,
    },
    plugins: [],
}
}

