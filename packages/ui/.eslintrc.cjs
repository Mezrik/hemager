module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.config.*"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: {
        react: { version: "detect" },
        "import/resolver": {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended",
        "plugin:tailwindcss/recommended",
        "plugin:vitest/legacy-recommended",
      ],
      rules: {
        "import/no-restricted-paths": [
          "error",
          {
            zones: [
              // disables cross-feature imports:
              // {
              //   target: "./src/features/auth",
              //   from: "./src/features",
              //   except: ["./auth"],
              // },
              // enforce unidirectional codebase:

              // e.g. src/app can import from src/features but not the other way around
              {
                target: "./src/features",
                from: "./src/app",
              },

              // e.g src/features and src/app can import from these shared modules but not the other way around
              {
                target: [
                  "./src/components",
                  "./src/hooks",
                  "./src/lib",
                  "./src/types",
                  "./src/utils",
                ],
                from: ["./src/features", "./src/app"],
              },
            ],
          },
        ],
        "import/no-cycle": "error",
        "linebreak-style": ["error", "unix"],
        "react/prop-types": "off",
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
            ],
            "newlines-between": "always",
            alphabetize: { order: "asc", caseInsensitive: true },
          },
        ],
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "prettier/prettier": ["error", {}, { usePrettierrc: true }],
        "check-file/filename-naming-convention": [
          "error",
          {
            "**/*.{ts,tsx}": "KEBAB_CASE",
          },
          {
            ignoreMiddleExtensions: true,
          },
        ],
      },
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: "./frontend/tsconfig.json",
      },
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/no-unresolved": "error",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // enforce unidirectional codebase:
          {
            target: "./src/features",
            from: "./src/app",
          },

          {
            target: [
              "./src/components",
              "./src/hooks",
              "./src/lib",
              "./src/types",
              "./src/utils",
            ],
            from: ["./src/features", "./src/app"],
          },
        ],
      },
    ],
  },
};
