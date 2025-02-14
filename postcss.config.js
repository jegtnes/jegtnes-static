import okLab from '@csstools/postcss-oklab-function';
import pruneVar from 'postcss-prune-var';
import presetEnv from 'postcss-preset-env';
export const plugins = [
	okLab(),
	pruneVar(),
	presetEnv()
];