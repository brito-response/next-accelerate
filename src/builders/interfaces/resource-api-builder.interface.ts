export interface INextApiBuilder {
  setDefaultPath(): this;
  setBasePath(): this;
  createCommonsApi(): this;
  createDefaultUsersApi(): this;
  createResourceCrudApi(): this;
  build(): void;
};
