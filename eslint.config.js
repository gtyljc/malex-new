import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
 
export default defineConfig([
	{
		...nextVitals,
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
			'react/no-unescaped-entities': 'off',
      		'@next/next/no-page-custom-font': 'off',
		}
	},
	
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
]);