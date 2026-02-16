import { createResource } from "../../src/commands/create-resource";
import { NextResourceBuilder } from "../../src/builders/resource-builder";
import * as guards from "../../src/utils/guards";

jest.mock("../../src/utils/guards", () => ({ nextProjectGuardSimple: jest.fn() }));
const setBasePath = jest.fn().mockReturnThis();
const createListPage = jest.fn().mockReturnThis();
const createDetailPage = jest.fn().mockReturnThis();
const createNewPage = jest.fn().mockReturnThis();
const build = jest.fn();

jest.mock("../../src/builders/resource-builder", () => { return { NextResourceBuilder: jest.fn().mockImplementation(() => ({ setBasePath, createListPage, createDetailPage, createNewPage, build })) }; });

describe("createResource command", () => {
    beforeAll(() => { jest.spyOn(process, "exit").mockImplementation((() => { throw new Error("process.exit called"); }) as never); });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should call project guard", () => {
        createResource("user", { git: false });// when
        expect(guards.nextProjectGuardSimple).toHaveBeenCalled();// then 
    });


    it("should show error and exit when name not provided", () => {
        // then
        expect(() => createResource()).toThrow("process.exit called");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mPlease provide the name of the resource.");
        expect(process.exit).toHaveBeenCalledWith(1);
    });


    it("should instantiate builder with input name", () => {
        createResource("user", { git: false });// when
        expect(NextResourceBuilder).toHaveBeenCalledWith("user", expect.any(Object));// then
    });

    it("should execute builder steps in chain", () => {
        createResource("user", { git: false });// when

        // then
        expect(setBasePath).toHaveBeenCalled();
        expect(createListPage).toHaveBeenCalled();
        expect(createDetailPage).toHaveBeenCalled();
        expect(createNewPage).toHaveBeenCalled();
        expect(build).toHaveBeenCalled();
    });

    it("should show success message", () => {
        createResource("user", { git: false });// when
        expect(console.log).toHaveBeenCalledWith('Resource "user" created \x1b[32m✔ Success\x1b[0m'); // then
    });

});
