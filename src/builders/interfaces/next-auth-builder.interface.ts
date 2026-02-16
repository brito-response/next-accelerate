export interface INextAuthBuilder {
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
