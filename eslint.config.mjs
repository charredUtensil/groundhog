// eslint.config.mjs
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// FIX: Add .js extension to the config imports
import pluginReactRecommended from "eslint-plugin-react/configs/recommended.js";
import pluginReactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // --- Core JavaScript/TypeScript/React Configuration ---
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // Language options: parser, globals, and parser settings
    languageOptions: {
      parser: tseslint.parser, // Use the TypeScript parser for all JS/TS/JSX files
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        ecmaVersion: "latest", // Use the latest ECMAScript version
        sourceType: "module",  // Use ES Modules
        project: './tsconfig.json', // Required for type-aware linting rules
      },
      globals: {
        ...globals.browser, // Browser global variables (e.g., window, document)
        ...globals.node,    // Node.js global variables (e.g., process, require)
      },
    },

    // Plugins used in this configuration block
    plugins: {
      js: js, // The base ESLint plugin (for recommended rules)
      react: pluginReact, // The React plugin
      '@typescript-eslint': tseslint.plugin, // The TypeScript plugin
    },

    // Extend recommended rule sets
    extends: [
      js.configs.recommended,           // Basic ESLint recommended rules
      ...tseslint.configs.recommendedTypeChecked, // TypeScript recommended rules (type-aware)
      pluginReactRecommended,           // React recommended rules
      pluginReactJsxRuntime,            // Rules for the new JSX transform (React 17+)
    ],

    // Specific rules overrides or additions
    rules: {
      // --- React Specific Rules ---
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform (Vite handles this)
      "react/prop-types": "off",         // Generally not needed if using TypeScript for prop types
      // Add more custom React rules here if needed, e.g.:
      // "react/jsx-uses-react": "off", // Only if you never use 'React' explicitly in JSX files

      // --- TypeScript Specific Rules (examples, adjust as needed) ---
      // "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // "@typescript-eslint/no-explicit-any": "warn",

      // --- General ESLint Rules (examples, adjust as needed) ---
      "no-unused-vars": "warn", // Warn about unused variables
      "no-console": ["warn", { allow: ["warn", "error"] }], // Allow console.warn and console.error
      // Add more custom rules here
    },

    // Settings passed to plugins
    settings: {
      react: {
        version: "detect", // Automatically detect the React version from package.json
      },
    },
  },

  // --- Markdown Configuration ---
  {
    files: ["**/*.md"],
    plugins: {
      markdown: markdown,
    },
    // Use the markdown processor to extract code blocks
    processor: markdown.processors.markdown,
    rules: {
      // You can add specific rules for code blocks inside markdown here if needed
    }
  },

  // --- CSS Configuration ---
  {
    files: ["**/*.css"],
    plugins: {
      css: css,
    },
    extends: [
      css.configs.recommended, // Recommended CSS rules
    ],
    rules: {
      // Add specific CSS rules here if needed
    }
  },

  // --- Ignore Files/Directories ---
  {
    ignores: [
      "dist/",
      "build/",
      ".vite/",
      "vite.config.ts",
      "vitest.config.ts",
      "**/*.test.{ts,tsx,js,jsx}",
    ],
  },
]);