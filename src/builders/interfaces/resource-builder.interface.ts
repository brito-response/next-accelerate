export interface IResourceBuilder {
  installDependencesRequired(): this;
  setBasePath(): this;
  setBasePathForComponents(): this;
  createComponentInputCustom(): this;
  createListPage(): this;
  createDetailPage(): this;
  createNewPage(): this;
  build(): void;
};
