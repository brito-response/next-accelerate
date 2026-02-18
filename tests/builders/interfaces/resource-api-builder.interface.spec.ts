import { INextApiBuilder } from "../../../src/builders/interfaces/resource-api-builder.interface";

describe("NextApiBuilder interface", () => {
  let nextApiBuilder: INextApiBuilder;

  beforeAll(() => {
    nextApiBuilder = {
      setDefaultPath() { return this; },
      setBasePath() { return this; },
      createCommonsApi() { return this; },
      createDefaultUsersApi() { return this; },
      createResourceCrudApi() { return this; },
      build() { }
    };
  });

  it("should have the correct methods", () => {
    expect(typeof nextApiBuilder.setDefaultPath).toBe("function");
    expect(typeof nextApiBuilder.setBasePath).toBe("function");
    expect(typeof nextApiBuilder.createCommonsApi).toBe("function");
    expect(typeof nextApiBuilder.createDefaultUsersApi).toBe("function");
    expect(typeof nextApiBuilder.createResourceCrudApi).toBe("function");
    expect(typeof nextApiBuilder.build).toBe("function");
  });

  it("should have 6 methods", () => {
    const methodCount = Object.keys(nextApiBuilder).length;
    expect(methodCount).toBe(6);
  });
});
