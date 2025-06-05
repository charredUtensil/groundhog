import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactRecommended from "eslint-plugin-react/configs/recommended.js";
import pluginReactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["bin/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}", "src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      js: js,
      react: pluginReact,
      '@typescript-eslint': tseslint.plugin,
    },

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      pluginReactRecommended,
      pluginReactJsxRuntime,
    ],

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: ["src/core/lore/graphs/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^(?:pg|state|start|end|cut|skip|_.*)$",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    files: ["*.md", "src/**/*.md"],
    plugins: {
      markdown: markdown,
    },
    processor: markdown.processors.markdown,
    rules: {}
  },

  {
    ignores: [
      "coverage",
      "dist",
      "node_modules",
      "**/*.test.{ts,tsx,js,jsx}",
    ],
  },
]);