import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				"roboto-mono": ["Roboto Mono", "sans-serif"],
				"inter": ["Inter", "sans-serif"]
			}
		}
	},

	plugins: []
} satisfies Config;
