import path from "node:path";
import { formCreateTemplate, formDeleteTemplate, formSchemeCreateTemplate, formSchemeUpdateTemplate, formUpdateTemplate } from "../templates";
import { createDir, createFile, pathExists } from "../utils/fs";
import { capitalize } from "../utils/string";
import { BuilderOptions } from "../utils/contracts/build-options";
import { IResourceFormBuilder } from "./interfaces/resource-form-builder.interface";
import { DependencyFormInstaller } from "../utils/services/install-dependences-form.service";
import { buttonGenericTemplate } from "../templates/components";
import { NextAccelerateBuilder } from "./core/next-accelerate-builder";

export class NextResourceFormBuilder extends NextAccelerateBuilder implements IResourceFormBuilder {

  constructor(inputName: string, options?: BuilderOptions) {
    super(inputName, options);
  }

  installDependencesRequired() {
    DependencyFormInstaller.getInstance().install();
    return this;
  }

  setBasePathForForm() {
    this.basePath = path.join(process.cwd(), "src/forms");
    createDir(this.basePath);
    return this;
  }

  setBasePathForComponents() {
    this.basePath = path.join(process.cwd(), "src/components");
    createDir(this.basePath);
    return this;
  }

  createButtonComponentForUseInForm() {
    this.basePath = path.join(process.cwd(), "src/components/ButtonGeneric");
    createDir(this.basePath);
    createFile(path.join(this.basePath, "index.tsx"), buttonGenericTemplate());
    return this;
  }

  createCrudForm() {
    this.basePath = path.join(process.cwd(), "src/forms");
    const sharedPath = path.join(this.basePath, "shared");
    const deletePath = path.join(sharedPath, "FormDelete");

    if (!pathExists(deletePath)) {
      createDir(sharedPath);
      createDir(deletePath);
      createFile(path.join(deletePath, "index.tsx"), formDeleteTemplate(capitalize(this.singular), capitalize(this.resource)));
      createFile(path.join(sharedPath, "index.ts"), `export { FormDeleteResource } from "./FormDelete";\n`);
    }

    const resourcePath = path.join(this.basePath, this.resource);
    createDir(resourcePath);

    const formNewPath = path.join(resourcePath, "FormNew");
    createDir(formNewPath);
    createFile(path.join(formNewPath, "index.tsx"), formCreateTemplate(capitalize(this.singular), capitalize(this.resource)));
    createFile(path.join(formNewPath, "form-scheme.ts"), formSchemeCreateTemplate());

    const formEditPath = path.join(resourcePath, "FormEdit");
    createDir(formEditPath);
    createFile(path.join(formEditPath, "index.tsx"), formUpdateTemplate(capitalize(this.singular), capitalize(this.resource)));
    createFile(path.join(formEditPath, "form-scheme.ts"), formSchemeUpdateTemplate(capitalize(this.singular), capitalize(this.resource)));
    createFile(path.join(resourcePath, "index.ts"), `export { FormNew${capitalize(this.singular)} } from "./FormNew";\n export { FormEdit${capitalize(this.singular)} } from "./FormEdit";`);

    if (this.options?.git) this.createCommit(`feat(${this.resource}): created crud form components`);
    return this;
  };

};

