import { createApiResource, createCommonsApiResource } from "../../src/commands/create-api-resource";
import { NextResourceApiBuilder } from "../../src/builders/resource-api-builder";
import * as guards from "../../src/utils/guards";

// guard
jest.mock("../../src/utils/guards", () => ({
    nextProjectGuardSimple: jest.fn(),
}));

// builder chain methods
const setDefaultPath = jest.fn().mockReturnThis();
const setBasePath = jest.fn().mockReturnThis();
const createCommonsApi = jest.fn().mockReturnThis();
const createDefaultUsersApi = jest.fn().mockReturnThis();
const createResourceCrudApi = jest.fn().mockReturnThis();
const build = jest.fn();

// builder
jest.mock("../../src/builders/resource-api-builder", () => {
    return {
        NextResourceApiBuilder: jest.fn().mockImplementation(() => ({
            setDefaultPath,
            setBasePath,
            createCommonsApi,
            createDefaultUsersApi,
            createResourceCrudApi,
            build
        })),
    };
});

describe("createApiResource commands", () => {

    beforeAll(() => {
        jest.spyOn(process, "exit")
            .mockImplementation((() => { throw new Error("process.exit called"); }) as never);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should call project guard for commons api", () => {
        // when
        createCommonsApiResource({ git: false });

        // then
        expect(guards.nextProjectGuardSimple).toHaveBeenCalled();
    });

    it("should instantiate builder with default resource", () => {
        // when
        createCommonsApiResource({ git: false });

        // then
        expect(NextResourceApiBuilder).toHaveBeenCalledWith("default", expect.any(Object));
    });

    it("should execute commons builder chain", () => {
        // when
        createCommonsApiResource({ git: false });

        // then
        expect(setDefaultPath).toHaveBeenCalled();
        expect(createCommonsApi).toHaveBeenCalled();
        expect(createDefaultUsersApi).toHaveBeenCalled();
        expect(build).toHaveBeenCalled();
    });

    it("should execute commons builder steps in correct order", () => {
        // when
        createCommonsApiResource({ git: false });

        // then
        expect(setDefaultPath.mock.invocationCallOrder[0]).toBeLessThan(createCommonsApi.mock.invocationCallOrder[0]);
        expect(createCommonsApi.mock.invocationCallOrder[0]).toBeLessThan(createDefaultUsersApi.mock.invocationCallOrder[0]);
    });

    it("should show success message for commons api", () => {
        // when
        createCommonsApiResource({ git: false });

        // then
        expect(console.log).toHaveBeenCalledWith('the resources "$commons created \x1b[32m✔ Success\x1b[0m');
    });

    it("should call project guard", () => {
        // when
        createApiResource("orders", { git: false });

        // then
        expect(guards.nextProjectGuardSimple).toHaveBeenCalled();
    });

    it("should show error and exit when name not provided", () => {
        // then
        expect(() => createApiResource()).toThrow("process.exit called");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mPlease provide the resource name.");
        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("should instantiate builder with input name", () => {
        // when
        createApiResource("product", { git: false });

        // then
        expect(NextResourceApiBuilder).toHaveBeenCalledWith("product", expect.any(Object));
    });

    it("should execute builder chain for resource api", () => {
        // when
        createApiResource("orders", { git: false });

        // then
        expect(setBasePath).toHaveBeenCalled();
        expect(createCommonsApi).toHaveBeenCalled();
        expect(createDefaultUsersApi).toHaveBeenCalled();
        expect(createResourceCrudApi).toHaveBeenCalled();
        expect(build).toHaveBeenCalled();
    });

    it("should execute builder steps in correct order", () => {
        // when
        createApiResource("orders", { git: false });

        // then
        expect(setBasePath.mock.invocationCallOrder[0]).toBeLessThan(createCommonsApi.mock.invocationCallOrder[0]);
        expect(createCommonsApi.mock.invocationCallOrder[0]).toBeLessThan(createDefaultUsersApi.mock.invocationCallOrder[0]);
        expect(createDefaultUsersApi.mock.invocationCallOrder[0]).toBeLessThan(createResourceCrudApi.mock.invocationCallOrder[0]);
    });

    it("should show success message", () => {
        // when
        createApiResource("orders", { git: false });

        // then
        expect(console.log).toHaveBeenCalledWith('the resources "orders" created \x1b[32m✔ Success\x1b[0m');
    });

});
