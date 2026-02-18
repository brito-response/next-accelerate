export interface INextInstallInBuilder {
  installDependencesRequired(): this;
  build(): void;
};
