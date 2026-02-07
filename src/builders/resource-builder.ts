import path from "path";
import pluralize from "pluralize";
import { createDir, createFile, pathExists } from "../utils/fs";
import { capitalize } from "../utils/string";
import { listPageTemplate } from "../templates/pages/list-page";
import { detailPageTemplate } from "../templates/pages/detail-page";
import { newPageTemplate } from "../templates/pages/new-page";
import { ResourceBuilder } from "./resource-builder.interface";
import { formCreateTemplate, formDeleteTemplate, formSchemeCreateTemplate, formSchemeUpdateTemplate, formUpdateTemplate } from "../templates";

export class NextResourceBuilder implements ResourceBuilder {
  private resource: string;
  private singular: string;
  private basePath!: string;

  constructor(private inputName: string) {
    this.resource = pluralize(inputName.toLowerCase());
    this.singular = pluralize.singular(this.resource);
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

  createListPage() {
    createFile(path.join(this.basePath, "page.tsx"), listPageTemplate(capitalize(this.resource)));
    return this;
  }

  createDetailPage() {
    const dir = path.join(this.basePath, `[${this.singular}Id]`);
    createDir(dir);

    createFile(path.join(dir, "page.tsx"), detailPageTemplate(capitalize(this.singular)));
    return this;
  }

  createNewPage() {
    const dir = path.join(this.basePath, "new");
    createDir(dir);

    createFile(path.join(dir, "page.tsx"), newPageTemplate(capitalize(this.singular)));
    return this;
  }

  createCrudForm() {
    const sharedPath = path.join(this.basePath, "shared");
    const deletePath = path.join(sharedPath, "FormDelete");

    if (!pathExists(deletePath)) {
      createDir(sharedPath);
      createDir(deletePath);
      createFile(path.join(deletePath, "index.tsx"), formDeleteTemplate());
      createFile(path.join(sharedPath, "index.ts"), `import { FormDeleteResource } from "./FormDelete";\nexport { FormDeleteResource };`);
    }

    const resourcePath = path.join(this.basePath, this.resource);
    createDir(resourcePath);

    const formNewPath = path.join(resourcePath, "FormNew");
    createDir(formNewPath);
    createFile(path.join(formNewPath, "index.tsx"), formCreateTemplate(capitalize(this.singular)));
    createFile(path.join(formNewPath, "form-scheme.ts"), formSchemeCreateTemplate(capitalize(this.singular)));

    const formEditPath = path.join(resourcePath, "FormEdit");
    createDir(formEditPath);
    createFile(path.join(formEditPath, "index.tsx"), formUpdateTemplate(capitalize(this.singular)));
    createFile(path.join(formEditPath, "form-scheme.ts"), formSchemeUpdateTemplate(capitalize(this.singular)));
    createFile(path.join(resourcePath, "index.ts"), `
      import { FormNew${capitalize(this.singular)} } from "./FormNew";\n
      import { FormEdit${capitalize(this.singular)} } from "./FormEdit";\n\n
      export { FormNew${capitalize(this.singular)}, FormEdit${capitalize(this.singular)} };
    `);

    return this;
  };

  build() {
    // future feature ex login, validação, hooks
  };
};

