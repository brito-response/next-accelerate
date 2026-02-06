import path from "path";
import fs from "fs";
import pluralize from "pluralize";

import { createDir, createFile } from "../utils/fs";
import { capitalize } from "../utils/string";
import { listPageTemplate } from "../templates/list-page";
import { detailPageTemplate } from "../templates/detail-page";
import { newPageTemplate } from "../templates/new-page";

export function createResource(inputName: string) {

  const appDir = path.join(process.cwd(), "src/app");
  if (!fs.existsSync(appDir)) {
    console.error("\x1b[31m ✖ Erro \x1b[0m" + "Execute dentro de um projeto Next.js");
    process.exit(1);
  }

  if (!inputName) {
    console.error("\x1b[32m ✔ Sucesso\x1b[0m" + "Informe o nome do recurso. Ex: user");
    process.exit(1);
  }

  const resource = pluralize(inputName.toLowerCase());
  const singular = pluralize.singular(resource);

  const BASE_PATH = path.join(process.cwd(), "src/app/(privates)", resource);

  createDir(BASE_PATH);
  createFile(path.join(BASE_PATH, "page.tsx"), listPageTemplate(capitalize(resource)));

  const detailDir = path.join(BASE_PATH, `[${singular}Id]`);
  createDir(detailDir);
  createFile(path.join(detailDir, "page.tsx"), detailPageTemplate(capitalize(singular)));

  const newDir = path.join(BASE_PATH, "new");
  createDir(newDir);
  createFile(path.join(newDir, "page.tsx"), newPageTemplate(capitalize(singular)));

  console.log(`Recurso "${resource}" criado, ` + "\x1b[32m ✔ Sucesso\x1b[0m");
}
