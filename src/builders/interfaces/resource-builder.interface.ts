export interface IResourceBuilder {
  setBasePath(): this;
  setBasePathForForm(): this;
  setBasePathForComponents(): this;
  createComponentInputCustom(): this;
  createListPage(): this;
  createDetailPage(): this;
  createNewPage(): this;
  createCrudForm(): this;
  build(): void;
};
