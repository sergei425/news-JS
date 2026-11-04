import path from 'path';
import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';

const baseConfig: Configuration & {
    devServer: { static: { directory: string } };
} = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
        ],
    },
    resolve: { extensions: ['.ts', '.js'] },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
};

export default async (
    _env: Record<string, unknown>,
    argv: { mode?: string },
): Promise<Configuration> => {
    const isProductionMode = argv.mode === 'production';
    const envConfig = isProductionMode
        ? await import('./webpack.prod.config')
        : await import('./webpack.dev.config');

    return merge(baseConfig, envConfig.default);
};