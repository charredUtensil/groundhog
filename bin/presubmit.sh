#! /usr/bin/env bash

echo "Presubmit: Running mermaidify...";
yarn mermaidify || exit 1;

echo "Presubmit: Running Prettier...";
yarn prettier --write bin src || exit 1;

echo "Presubmit: Running ESLint...";
yarn eslint --fix src --max-warnings=0 || exit 1;

echo "Presubmit: Building...";
yarn build || exit 1;

echo "Presubmit: Running all tests...";
yarn test --no-watch || exit 1;

echo "Presubmit succeeded. Remember to commit any changes."