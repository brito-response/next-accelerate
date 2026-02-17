import { INextAuthBuilder } from "../../../src/builders/interfaces/next-auth-builder.interface";

describe("NextAuthBuilder interface", () => {
  let nextAuthBuilder: INextAuthBuilder;

  beforeAll(() => {
    nextAuthBuilder = {
      installDependencesRequired() { return this; },
      setBasePathAndCreateConfig() { return this; },
      createNextAuthAuxOptions() { return this; },
      createNextAuthForms() { return this; },
      createNextAutorizationSystem() { return this; },
      createNextLayouts() { return this; },
      setLayouts() { return this; },
      createComponentsAux() { return this; },
      setEnvironmentVariable() { return this; },
      build() { }
    };
  });

  it("should have the correct methods", () => {
    expect(typeof nextAuthBuilder.installDependencesRequired).toBe("function");
    expect(typeof nextAuthBuilder.setBasePathAndCreateConfig).toBe("function");
    expect(typeof nextAuthBuilder.createNextAuthAuxOptions).toBe("function");
    expect(typeof nextAuthBuilder.createNextAuthForms).toBe("function");
    expect(typeof nextAuthBuilder.createNextAutorizationSystem).toBe("function");
    expect(typeof nextAuthBuilder.createNextLayouts).toBe("function");
    expect(typeof nextAuthBuilder.setLayouts).toBe("function");
    expect(typeof nextAuthBuilder.createComponentsAux).toBe("function");
    expect(typeof nextAuthBuilder.setEnvironmentVariable).toBe("function");
    expect(typeof nextAuthBuilder.build).toBe("function");
  });

  it("should have 9 methods", () => {
    const methodCount = Object.keys(nextAuthBuilder).length;
    expect(methodCount).toBe(10);
  });

});
