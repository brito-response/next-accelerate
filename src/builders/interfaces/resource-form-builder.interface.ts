export interface IResourceFormBuilder {
  installDependencesRequired(): this;
  setBasePathForForm(): this;
  setBasePathForComponents(): this;
  createCrudForm(): this;
  build(): void;
};
