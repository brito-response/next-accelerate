import fs from "fs";
import path from "path";

export function nextProjectGuardSimple() {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.error("\x1b[31m ✖ Erro \x1b[0mNenhum package.json encontrado neste diretório.");
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const hasNext = pkg.dependencies?.next || pkg.devDependencies?.next;

  if (!hasNext) {
    console.error("\x1b[31m ✖ Erro \x1b[0mExecute dentro de um projeto Next.js");
    process.exit(1);
  }
}