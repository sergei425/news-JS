import * as path from 'path';
import type { Configuration } from 'webpack';

const config: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
};

export default config;
