import {
    defineConfig,
} from "vitest/config";


export default defineConfig({
    test: {
        environment:
            "node",

        globals:
            false,

        setupFiles: [
            "./tests/setup.ts",
        ],

        include: [
            "tests/**/*.test.ts",
        ],

        sequence: {
            concurrent:
                false,
        },

        fileParallelism:
            false,

        hookTimeout:
            15_000,

        testTimeout:
            15_000,
    },
});