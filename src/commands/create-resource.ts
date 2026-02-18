import { NextResourceBuilder } from "../builders/resource-builder";
import { nextProjectGuardSimple } from "../utils/guards";

export function createResource(inputName?: string, options?: { git?: boolean }) {
  nextProjectGuardSimple();

  if (!inputName) {
    console.error("\x1b[31m ✖ Erro \x1b[0mPlease provide the name of the resource.");
    process.exit(1);
  }

  const builder = new NextResourceBuilder(inputName, options);
  builder.setBasePath().createListPage().createDetailPage().createNewPage().build();

  console.log(`Resource "${inputName}" created \x1b[32m✔ Success\x1b[0m`);
};

export function createComponents(options?: { git?: boolean }) {
  nextProjectGuardSimple();

  const builder = new NextResourceBuilder("default", options);
  builder.installDependencesRequired().setBasePathForComponents().createComponentInputCustom().build();

  console.log(`Resource "components" created \x1b[32m✔ Success\x1b[0m`);
};
