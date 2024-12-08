#! /usr/bin/env bash

echo "Presubmit: Running Prettier...";
prettier --write src || exit 1;

echo "Presubmit: Running ESLint...";
eslint --fix src --max-warnings=0 || exit 1;

echo "Presubmit: Building...";
react-scripts build || exit 1;

echo "Presubmit: Running all tests...";
react-scripts test --all --watchAll=false --coverage || exit 1;

echo "Presubmit succeeded. Remember to commit any changes."