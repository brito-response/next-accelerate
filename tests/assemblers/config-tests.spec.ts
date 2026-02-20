import { createTestUnitConfig, createTestE2EConfig } from "../../src/commands/create-config-tests";
import { TestsBuilder } from "../../src/builders/tests-builder";
import * as guards from "../../src/utils/guards";

jest.mock("../../src/utils/guards", () => ({ nextProjectGuardSimple: jest.fn(), }));

const setBasePathAndCreateConfigViTest = jest.fn().mockReturnThis();
const installDependencesViTestRequired = jest.fn().mockReturnThis();
const setBasePathAndCreatePlaywrightConfigTest = jest.fn().mockReturnThis();
const installDependencesPlaywrightTestRequired = jest.fn().mockReturnThis();
const build = jest.fn();

jest.mock("../../src/builders/tests-builder", () => {
    return {
        TestsBuilder: jest.fn().mockImplementation(() => ({
            setBasePathAndCreateConfigViTest,
            installDependencesViTestRequired,
            setBasePathAndCreatePlaywrightConfigTest,
            installDependencesPlaywrightTestRequired,
            build,
        })),
    };
});

describe("createTest configs commands", () => {

    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    // createTestUnitConfig

    it("should call project guard", () => {
        // when
        createTestUnitConfig({ git: false });

        // then
        expect(guards.nextProjectGuardSimple).toHaveBeenCalled();
    });

    it("should instantiate builder", () => {
        // when
        createTestUnitConfig({ git: true });

        // then
        expect(TestsBuilder).toHaveBeenCalledWith({ git: true });
    });

    it("should execute builder chain", () => {
        // when
        createTestUnitConfig({ git: false });

        // then
        expect(setBasePathAndCreateConfigViTest).toHaveBeenCalled();
        expect(installDependencesViTestRequired).toHaveBeenCalled();
        expect(build).toHaveBeenCalled();
    });

    it("should execute steps in correct order", () => {
        // when
        createTestUnitConfig({ git: false });

        // then
        expect(setBasePathAndCreateConfigViTest.mock.invocationCallOrder[0]).toBeLessThan(installDependencesViTestRequired.mock.invocationCallOrder[0]);
        expect(installDependencesViTestRequired.mock.invocationCallOrder[0]).toBeLessThan(build.mock.invocationCallOrder[0]);
    });

    it("should show success message", () => {
        // when
        createTestUnitConfig({ git: false });

        // then
        expect(console.log).toHaveBeenCalledWith(
            "resource configured \x1b[32m✔ Success\x1b[0m"
        );
    });

    // createTestE2EConfig

    it("should call project guard", () => {
        // when
        createTestE2EConfig({ git: false });

        // then
        expect(guards.nextProjectGuardSimple).toHaveBeenCalled();
    });

    it("should instantiate builder", () => {
        // when
        createTestE2EConfig({ git: true });

        // then
        expect(TestsBuilder).toHaveBeenCalledWith({ git: true });
    });

    it("should execute builder chain", () => {
        // when
        createTestE2EConfig({ git: false });

        // then
        expect(setBasePathAndCreatePlaywrightConfigTest).toHaveBeenCalled();
        expect(installDependencesPlaywrightTestRequired).toHaveBeenCalled();
        expect(build).toHaveBeenCalled();
    });

    it("should execute steps in correct order", () => {
        // when
        createTestE2EConfig({ git: false });

        // then
        expect(setBasePathAndCreatePlaywrightConfigTest.mock.invocationCallOrder[0]).toBeLessThan(installDependencesPlaywrightTestRequired.mock.invocationCallOrder[0]);
        expect(installDependencesPlaywrightTestRequired.mock.invocationCallOrder[0]).toBeLessThan(build.mock.invocationCallOrder[0]);
    });

    it("should show success message", () => {
        // when
        createTestE2EConfig({ git: false });

        // then
        expect(console.log).toHaveBeenCalledWith("resource configured \x1b[32m✔ Success\x1b[0m");
    });

});
