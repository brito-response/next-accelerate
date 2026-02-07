import { NextResourceBuilder } from "../builders/resource-builder";
import { nextProjectGuardSimple } from "../utils/guards";

export function createFormForResource(inputName?: string) {
  nextProjectGuardSimple();

  if (!inputName) {
    console.error("\x1b[31m ✖ Erro \x1b[0mInforme o nome do recurso");
    process.exit(1);
  }

  const builder = new NextResourceBuilder(inputName);
  builder.setBasePathForForm().createCrudForm().build();
  console.log(`Form para o recurso "${inputName}" criado \x1b[32m✔ Sucesso\x1b[0m`);
}
