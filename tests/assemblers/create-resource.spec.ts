import { createResource, createComponents } from "../../src/commands/create-resource";
import { NextResourceBuilder } from "../../src/builders/resource-builder";
import * as guards from "../../src/utils/guards";

jest.mock("../../src/utils/guards", () => ({
  nextProjectGuardSimple: jest.fn(),
}));

const setBasePath = jest.fn().mockReturnThis();
const createListPage = jest.fn().mockReturnThis();
const createDetailPage = jest.fn().mockReturnThis();
const createNewPage = jest.fn().mockReturnThis();

const installDependencesRequired = jest.fn().mockReturnThis();
const setBasePathForComponents = jest.fn().mockReturnThis();
const createComponentInputCustom = jest.fn().mockReturnThis();

const build = jest.fn();

jest.mock("../../src/builders/resource-builder", () => {
  return {
    NextResourceBuilder: jest.fn().mockImplementation(() => ({
      setBasePath,
      createListPage,
      createDetailPage,
      createNewPage,
      installDependencesRequired,
      setBasePathForComponents,
      createComponentInputCustom,
      build,
    })),
  };
});

describe("create-resource commands", () => {
  beforeAll(() => {
    jest.spyOn(process, "exit").mockImplementation((() => { throw new Error("process.exit called"); }) as never);
    jest.spyOn(console, "error").mockImplementation(jest.fn());
    jest.spyOn(console, "log").mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("createResource", () => {

    it("should call project guard", () => {
      createResource("user", { git: false }); // when

      expect(guards.nextProjectGuardSimple).toHaveBeenCalled(); // then
    });

    it("should show error and exit when name not provided", () => {
      expect(() => createResource()).toThrow("process.exit called"); // when

      // then
      expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mPlease provide the name of the resource.");
      expect(process.exit).toHaveBeenCalledWith(1); 
    });

    it("should instantiate builder with input name", () => {
      createResource("user", { git: false });  // when

      expect(NextResourceBuilder).toHaveBeenCalledWith("user",expect.any(Object));  // then
    });

    it("should execute builder steps in chain", () => {
      createResource("user", { git: false });

      //then
      expect(setBasePath).toHaveBeenCalled();
      expect(createListPage).toHaveBeenCalled();
      expect(createDetailPage).toHaveBeenCalled();
      expect(createNewPage).toHaveBeenCalled();
      expect(build).toHaveBeenCalled();
    });

    it("should show success message", () => {
      createResource("user", { git: false });

      expect(console.log).toHaveBeenCalledWith('Resource "user" created \x1b[32m✔ Success\x1b[0m');
    });
  });

  describe("createComponents", () => {
    it("should call project guard", () => {
      createComponents("input", { git: false });

      expect(guards.nextProjectGuardSimple).toHaveBeenCalled();
    });

    it("should show error and exit when name not provided", () => {
      expect(() => createComponents()).toThrow("process.exit called");

      expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mPlease provide the name of the resource.");
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("should instantiate builder with input name", () => {
      createComponents("input", { git: false });

      expect(NextResourceBuilder).toHaveBeenCalledWith("input",expect.any(Object));
    });

    it("should execute component builder steps in chain", () => {
      createComponents("input", { git: false });

      expect(installDependencesRequired).toHaveBeenCalled();
      expect(setBasePathForComponents).toHaveBeenCalled();
      expect(createComponentInputCustom).toHaveBeenCalled();
      expect(build).toHaveBeenCalled();
    });

    it("should show success message", () => {
      createComponents("input", { git: false }); // when

      expect(console.log).toHaveBeenCalledWith('Resource "input" created \x1b[32m✔ Success\x1b[0m'); // then
    });
  });
});
