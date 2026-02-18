import { INextInstallInBuilder } from "./resource-install-builder.interface";

export interface IResourceFormBuilder extends INextInstallInBuilder{
  setBasePathForForm(): this;
  setBasePathForComponents(): this;
  createCrudForm(): this;
};
