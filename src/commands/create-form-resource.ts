import { NextResourceFormBuilder } from "../builders/resource-form-builder";
import { nextProjectGuardSimple } from "../utils/guards";

export function createFormForResource(inputName?: string, options?: { git?: boolean }) {
  nextProjectGuardSimple();

  if (!inputName) {
    console.error("\x1b[31m ✖ Erro \x1b[0mPlease provide the resource name.");
    process.exit(1);
  }

  const builder = new NextResourceFormBuilder(inputName, options);
  builder.setBasePathForForm().setBasePathForComponents().createButtonComponentForUseInForm().createCrudForm().installDependencesRequired().build();

  console.log(`Form for the resource "${inputName}" created \x1b[32m✔ Success\x1b[0m`);
};
