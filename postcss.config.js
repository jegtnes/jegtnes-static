const postcssOKLabFunction = require('@csstools/postcss-oklab-function');
const cssnano = require('cssnano');
const pruneVar = require('postcss-prune-var');

module.exports = {
	plugins: [
		postcssOKLabFunction(),
		pruneVar(),
		cssnano({preset: 'default'})
	]
}