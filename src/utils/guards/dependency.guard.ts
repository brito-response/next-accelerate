import fs from "node:fs";
import path from "node:path";

export function hasDependency(pkgName: string): boolean {
    const cwd = process.cwd();
    const pkgPath = path.join(cwd, "package.json");

    if (!fs.existsSync(pkgPath)) {
        console.error("\x1b[31m ✖ Erro \x1b[0mNenhum package.json encontrado.");
        process.exit(1);
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    return Boolean(
        pkg.dependencies?.[pkgName] ||
        pkg.devDependencies?.[pkgName] ||
        pkg.peerDependencies?.[pkgName]
    );
}
