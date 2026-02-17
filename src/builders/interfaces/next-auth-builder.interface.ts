export interface INextAuthBuilder {
  installDependencesRequired(): this;
  setBasePathAndCreateConfig(): this;
  createNextAuthAuxOptions(): this;
  createNextAuthForms(): this;
  createNextAutorizationSystem(): this;
  createNextLayouts(): this;
  setLayouts(): this;
  createComponentsAux(): this;
  setEnvironmentVariable(): this;
  build(): void;
};
