const okLab = require('@csstools/postcss-oklab-function');
const pruneVar = require('postcss-prune-var');
const presetEnv = require('postcss-preset-env');
module.exports = {
	plugins: [
		okLab(),
		pruneVar(),
		presetEnv()
	]
}