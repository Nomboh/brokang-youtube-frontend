/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Roboto", "san-serif"],
			headings: ["Poppins", "san-serif"],
		},
		extend: {
			screens: {
				"800px": "800px",
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#f97316",

					secondary: "#f000b8",

					accent: "#1dcdbc",

					neutral: "#2e2e3a",

					"base-100": "#ffffff",

					info: "#3abff8",

					success: "#36d399",

					warning: "#fbbd23",

					error: "#f87272",
				},
			},
		],
	},
	plugins: [require("daisyui")],
}
