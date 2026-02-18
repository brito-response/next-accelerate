import { INextInstallInBuilder } from "./resource-install-builder.interface";

export interface INextAuthBuilder extends INextInstallInBuilder {
  setBasePathAndCreateConfig(): this;
  createNextAuthAuxOptions(): this;
  createNextAuthForms(): this;
  createNextAutorizationSystem(): this;
  createNextLayouts(): this;
  setLayouts(): this;
  createComponentsAux(): this;
  setEnvironmentVariable(): this;

};
