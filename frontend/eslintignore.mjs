import { globalIgnores } from "eslint/config";

export default globalIgnores(["**/.*/**/*", "**/node_modules", "**/.next/**/*", "**/_next/**/*", "**/.vscode/**/*", "**/dist/**/*", "**/build/**/*", "**/public/**/*"]);
