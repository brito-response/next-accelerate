import { INextInstallInBuilder } from "./resource-install-builder.interface";

export interface IResourceBuilder extends INextInstallInBuilder {
  installDependencesRequired(): this;
  setBasePath(): this;
  setBasePathForComponents(): this;
  createComponentInputCustom(): this;
  createListPage(): this;
  createDetailPage(): this;
  createNewPage(): this;
};
