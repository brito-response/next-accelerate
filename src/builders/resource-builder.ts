import path from "node:path";
import { inputFormHelperTestUnitTemplate, inputTemplate, inputTestUnitTemplate } from "../templates";
import { createDir, createFile } from "../utils/fs";
import { capitalize } from "../utils/string";
import { listPageTemplate } from "../templates/pages/list-page";
import { detailPageTemplate } from "../templates/pages/detail-page";
import { newPageTemplate } from "../templates/pages/new-page";
import { IResourceBuilder } from "./interfaces/resource-builder.interface";
import { updatePageTemplate } from "../templates/pages/update-page";
import { deletePageTemplate } from "../templates/pages/delete-page";
import { BuilderOptions } from "../utils/contracts/build-options";
import { DependencyInstaller } from "../utils/services/install-dependences.service";
import { NextAccelerateBuilder } from "./core/next-accelerate-builder";

export class NextResourceBuilder extends NextAccelerateBuilder implements IResourceBuilder {

  constructor(inputName: string, options?: BuilderOptions) {
    super(inputName, options);
  }

  // required for components only
  installDependencesRequired() {
    DependencyInstaller.getInstance().install();
    return this;
  }

  setBasePath() {
    this.basePath = path.join(process.cwd(), "src/app/(privates)", this.resource);
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

    if (this.options?.test) {
      createFile(path.join(componentPath, "InputCustom.spec.tsx"), inputTestUnitTemplate());
      createFile(path.join(componentPath, "renderWithForm.tsx"), inputFormHelperTestUnitTemplate());
    };
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

};

