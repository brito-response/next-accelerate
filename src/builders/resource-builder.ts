import path from "node:path";
import pluralize from "pluralize";
import { formCreateTemplate, formDeleteTemplate, formSchemeCreateTemplate, formSchemeUpdateTemplate, formUpdateTemplate, inputTemplate } from "../templates";
import { createDir, createFile, pathExists } from "../utils/fs";
import { capitalize } from "../utils/string";
import { listPageTemplate } from "../templates/pages/list-page";
import { detailPageTemplate } from "../templates/pages/detail-page";
import { newPageTemplate } from "../templates/pages/new-page";
import { IResourceBuilder } from "./interfaces/resource-builder.interface";
import { updatePageTemplate } from "../templates/pages/update-page";
import { deletePageTemplate } from "../templates/pages/delete-page";
import { BuilderOptions } from "../utils/contracts/build-options";
import { gitCommit } from "../utils/services/git.service";
import { DependencyInstaller } from "../utils/services/install-dependences.service";

export class NextResourceBuilder implements IResourceBuilder {
  private readonly resource: string;
  private readonly singular: string;
  private basePath!: string;
  private readonly options?: BuilderOptions;

  constructor(private readonly inputName: string, options?: BuilderOptions) {
    this.options = options;
    this.resource = pluralize(inputName.toLowerCase());
    this.singular = pluralize.singular(this.resource);
  }

  private createCommit(message: string) {
    if (!this.options?.git) return;
    gitCommit(message);
  }

  setBasePath() {
    this.basePath = path.join(process.cwd(), "src/app/(privates)", this.resource);
    createDir(this.basePath);
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

  createComponentInputCustom() {
    const componentPath = path.join(this.basePath, "Inputs/InputCustom");
    createDir(componentPath);
    createFile(path.join(componentPath, "index.tsx"), inputTemplate());

    if (this.options?.git) this.createCommit(`feat(input): add input custom component`);

    return this;
  }

  createListPage() {
    createFile(path.join(this.basePath, "page.tsx"), listPageTemplate(capitalize(this.singular), capitalize(this.resource)));
    return this;
  }

  createDetailPage() {
    const detailDir = path.join(this.basePath, `[${this.singular}Id]`);
    createDir(detailDir);

    createFile(path.join(detailDir, "page.tsx"), detailPageTemplate(capitalize(this.singular)));

    const editDir = path.join(detailDir, "edit");
    createDir(editDir);
    createFile(path.join(editDir, "page.tsx"), updatePageTemplate(capitalize(this.singular), capitalize(this.resource)));

    const deleteDir = path.join(detailDir, "delete");
    createDir(deleteDir);
    createFile(path.join(deleteDir, "page.tsx"), deletePageTemplate(capitalize(this.singular)));

    this.createCommit(`feat(${this.resource}): add all pages for detail view`);

    return this;
  }

  createNewPage() {
    const dir = path.join(this.basePath, "new");
    createDir(dir);
    createFile(path.join(dir, "page.tsx"), newPageTemplate(capitalize(this.singular), capitalize(this.resource)));
    return this;
  }

  createCrudForm() {
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

    DependencyInstaller.getInstance().install();

    const formNewPath = path.join(resourcePath, "FormNew");
    createDir(formNewPath);
    createFile(path.join(formNewPath, "index.tsx"), formCreateTemplate(capitalize(this.singular), capitalize(this.resource)));
    createFile(path.join(formNewPath, "form-scheme.ts"), formSchemeCreateTemplate());

    const formEditPath = path.join(resourcePath, "FormEdit");
    createDir(formEditPath);
    createFile(path.join(formEditPath, "index.tsx"), formUpdateTemplate(capitalize(this.singular), capitalize(this.resource)));
    createFile(path.join(formEditPath, "form-scheme.ts"), formSchemeUpdateTemplate(capitalize(this.singular), capitalize(this.resource)));
    createFile(path.join(resourcePath, "index.ts"), `
      export { FormNew${capitalize(this.singular)} } from "./FormNew";\n
      export { FormEdit${capitalize(this.singular)} } from "./FormEdit";
    `);

    this.createCommit(`feat(${this.resource}): created crud form components`);

    return this;
  };

  build() {
    if (!this.options?.git) return;
    console.log("commits made successfully ✨")
  };
};

