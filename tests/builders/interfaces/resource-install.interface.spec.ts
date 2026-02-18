import { INextInstallInBuilder } from "../../../src/builders/interfaces/resource-install-builder.interface";

describe("INextInstallInBuilder interface", () => {
  let builder: INextInstallInBuilder;

  beforeAll(() => {
    builder = {
      installDependencesRequired() { return this; },
      build() { }
    };
  });

  it("should have the correct methods", () => {
    expect(typeof builder.installDependencesRequired).toBe("function");
    expect(typeof builder.build).toBe("function");
  });

  it("should have 2 methods", () => {
    const methodCount = Object.keys(builder).length;
    expect(methodCount).toBe(2);
  });
});
