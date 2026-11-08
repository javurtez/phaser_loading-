const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = [
	{
		ignores: ['node_modules/', 'public/', 'webpack.config.js', 'eslint.config.js']
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				Phaser: 'readonly'
			}
		},
		rules: {
			"indent": ["warn", "tab"],
			"no-console": ["warn"],
			"no-multiple-empty-lines": ["warn", { "max": 1 }]
		}
	}
];
