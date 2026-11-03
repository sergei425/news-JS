declare module 'dotenv-webpack' {
    import type { Compiler } from 'webpack';

    class DotenvWebpackPlugin {
        constructor(options?: Record<string, unknown>);
        apply(compiler: Compiler): void;
    }

    export default DotenvWebpackPlugin;
}