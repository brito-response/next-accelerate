export interface ResourceBuilder {
  setBasePath(): this;
  setBasePathForForm() : this;
  createListPage(): this;
  createDetailPage(): this;
  createNewPage(): this;
  createCrudForm(): this;

  build(): void;
}
