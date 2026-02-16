jest.mock("../../src/utils/services/install-dependences.service", () => ({
    DependencyInstaller: {
        getInstance: jest.fn().mockReturnValue({
            install: jest.fn().mockResolvedValue(undefined), // mock assíncrono seguro
        }),
    },
}));

import { createFormForResource } from "../../src/commands/create-form-resource";
import { NextResourceBuilder } from "../../src/builders/resource-builder";
import * as guards from "../../src/utils/guards";

jest.mock("../../src/utils/guards", () => ({ nextProjectGuardSimple: jest.fn() }));

const setBasePathForComponents = jest.fn().mockReturnThis();
const createComponentInputCustom = jest.fn().mockReturnThis();
const setBasePathForForm = jest.fn().mockReturnThis();
const createCrudForm = jest.fn().mockReturnThis();
const build = jest.fn();

jest.mock("../../src/builders/resource-builder", () => {
    return {
        NextResourceBuilder: jest.fn().mockImplementation(() => ({
            setBasePathForComponents,
            createComponentInputCustom,
            setBasePathForForm,
            createCrudForm,
            build
        })),
    };
});

describe("createFormForResource command", () => {
    beforeAll(() => {
        jest.spyOn(process, "exit").mockImplementation((() => { throw new Error("process.exit called"); }) as never);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should call project guard", () => {
        createFormForResource("user", { git: false }); // when
        expect(guards.nextProjectGuardSimple).toHaveBeenCalled(); // then
    });

    it("should show error and exit when name not provided", () => {
        // then
        expect(() => createFormForResource()).toThrow("process.exit called");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mPlease provide the resource name.");
        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("should instantiate builder with input name", () => {
        createFormForResource("product", { git: false }); // when
        expect(NextResourceBuilder).toHaveBeenCalledWith("product", expect.any(Object)); // then
    });

    it("should execute form builder steps in chain", () => {
        createFormForResource("user", { git: false }); // when

        // then
        expect(setBasePathForComponents).toHaveBeenCalled();
        expect(createComponentInputCustom).toHaveBeenCalled();
        expect(setBasePathForForm).toHaveBeenCalled();
        expect(createCrudForm).toHaveBeenCalled();
        expect(build).toHaveBeenCalled();
    });

    it("should execute builder steps in correct order", () => {
        createFormForResource("user", { git: false }); // when

        // then -- invoc 0 < 1 ... sequence
        expect(setBasePathForComponents.mock.invocationCallOrder[0]).toBeLessThan(createComponentInputCustom.mock.invocationCallOrder[0]);
        expect(createComponentInputCustom.mock.invocationCallOrder[0]).toBeLessThan(setBasePathForForm.mock.invocationCallOrder[0]);
    });

    it("should show success message", () => {
        createFormForResource("user", { git: false }); // when
        expect(console.log).toHaveBeenCalledWith('Form for the resource "user" created \x1b[32m✔ Success\x1b[0m'); // then
    });
});
