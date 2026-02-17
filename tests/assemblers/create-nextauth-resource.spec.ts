import { createNextAutResource } from "../../src/commands/create-nextauth-resource";
import { NextAuthBuilder } from "../../src/builders/next-auth-builder";
import * as guards from "../../src/utils/guards";

jest.mock("../../src/utils/guards", () => ({ nextProjectGuardSimple: jest.fn() }));

const installDependencesRequired = jest.fn().mockReturnThis();
const setBasePathAndCreateConfig = jest.fn().mockReturnThis();
const createNextAuthAuxOptions = jest.fn().mockReturnThis();
const createNextAuthForms = jest.fn().mockReturnThis();
const createNextAutorizationSystem = jest.fn().mockReturnThis();
const createNextLayouts = jest.fn().mockReturnThis();
const setLayouts = jest.fn().mockReturnThis();
const createComponentsAux = jest.fn().mockReturnThis();
const setEnvironmentVariable = jest.fn().mockReturnThis();
const build = jest.fn();

jest.mock("../../src/builders/next-auth-builder", () => {
    return {
        NextAuthBuilder: jest.fn().mockImplementation(() => ({
            installDependencesRequired,
            setBasePathAndCreateConfig,
            createNextAuthAuxOptions,
            createNextAuthForms,
            createNextAutorizationSystem,
            createNextLayouts,
            setLayouts,
            createComponentsAux,
            setEnvironmentVariable,
            build,
        })),
    };
});

describe("createNextAutResource command", () => {
    beforeEach(() => {
        jest.spyOn(console, "log").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should call project guard", () => {
        // when
        createNextAutResource({ git: false });

        // then
        expect(guards.nextProjectGuardSimple).toHaveBeenCalled();
    });

    it("should instantiate NextAuthBuilder with options", () => {
        // when
        createNextAutResource({ git: true });

        // then
        expect(NextAuthBuilder).toHaveBeenCalledWith({ git: true });
    });

    it("should execute next-auth builder steps in chain", () => {
        // when
        createNextAutResource({ git: false });

        // then
        expect(setBasePathAndCreateConfig).toHaveBeenCalled();
        expect(createNextAuthAuxOptions).toHaveBeenCalled();
        expect(createNextAuthForms).toHaveBeenCalled();
        expect(build).toHaveBeenCalled();
    });

    it("should execute builder steps in correct order", () => {
        // when
        createNextAutResource({ git: false });

        // then
        expect(setBasePathAndCreateConfig.mock.invocationCallOrder[0]).toBeLessThan(createNextAuthAuxOptions.mock.invocationCallOrder[0]);
        expect(createNextAuthAuxOptions.mock.invocationCallOrder[0]).toBeLessThan(createNextAuthForms.mock.invocationCallOrder[0]);
        expect(createNextAuthForms.mock.invocationCallOrder[0]).toBeLessThan(build.mock.invocationCallOrder[0]);
    });

    it("should show success message", () => {
        // when
        createNextAutResource({ git: false });

        // then
        expect(console.log).toHaveBeenCalledWith("next auth configured \x1b[32m✔ success\x1b[0m");
    });
});
