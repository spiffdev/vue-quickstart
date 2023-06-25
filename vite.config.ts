import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import replace from '@rollup/plugin-replace';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        commonjsOptions: {
            include: [],
            transformMixedEsModules: true,
        },
    },
    plugins: [
        vue(),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': false,
        }),
        inject({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            fs: 'memfs',
            http: 'stream-http',
            https: 'https-browserify',
        },
    },
    optimizeDeps: {
        disabled: false,
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process: true,
                }),
            ],
        },
    },
});
