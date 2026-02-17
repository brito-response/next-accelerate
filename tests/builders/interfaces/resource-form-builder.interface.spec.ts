import { IResourceFormBuilder } from "../../../src/builders/interfaces/resource-form-builder.interface";

describe("IResourceFormBuilder interface", () => {

  let resourceFormBuilder: IResourceFormBuilder;

  beforeAll(() => {
    resourceFormBuilder = {
      installDependencesRequired() { return this; },
      setBasePathForForm() { return this; },
      setBasePathForComponents() { return this; },
      createCrudForm() { return this; },
      build() { }
    };
  });

  it("should have all required methods", () => {
    expect(typeof resourceFormBuilder.installDependencesRequired).toBe("function");
    expect(typeof resourceFormBuilder.setBasePathForForm).toBe("function");
    expect(typeof resourceFormBuilder.setBasePathForComponents).toBe("function");
    expect(typeof resourceFormBuilder.createCrudForm).toBe("function");
    expect(typeof resourceFormBuilder.build).toBe("function");
  });

  it("should have exactly 5 methods", () => {
    const methodCount = Object.keys(resourceFormBuilder).length;
    expect(methodCount).toBe(5);
  });

  it("should allow method chaining", () => {
    const result = resourceFormBuilder.installDependencesRequired().setBasePathForForm().setBasePathForComponents().createCrudForm();
    expect(result).toBe(resourceFormBuilder);
  });

});
