import * as fsUtils from "../../src/utils/fs";
import fs from "node:fs";
import { TestsBuilder } from "../../src/builders/tests-builder";

jest.mock("node:fs", () => ({
    readFileSync: jest.fn(),
    writeFileSync: jest.fn(),
}));

jest.mock("../../src/utils/fs", () => ({
    createDir: jest.fn(),
    createFile: jest.fn(),
    pathExists: jest.fn(),
}));

jest.mock("../../src/utils/services/git.service", () => ({
    gitCommit: jest.fn(),
}));

jest.mock("../../src/utils/services/install-tests-unit-dependences.service", () => ({
    DependencyTetsUnitInstaller: {
        getInstance: () => ({
            install: jest.fn(),
        }),
    },
}));

jest.mock("../../src/utils/services/install-tests-e2e-dependences.service", () => ({
    DependencyTetsE2EInstaller: {
        getInstance: () => ({
            install: jest.fn(),
        }),
    },
}));

describe("TestsBuilder", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(process, "cwd").mockReturnValue("/app");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should be chainable (fluent interface)", () => {
        const builder = new TestsBuilder({ git: true });

        expect(builder.installDependencesViTestRequired()).toBe(builder);
        expect(builder.installDependencesPlaywrightTestRequired()).toBe(builder);
        expect(builder.setBasePathAndCreateConfigViTest()).toBe(builder);
        expect(builder.setBasePathAndCreatePlaywrightConfigTest()).toBe(builder);
    });

    it("should create vitest config files", () => {
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);

        const builder = new TestsBuilder({ git: true });
        builder.setBasePathAndCreateConfigViTest();

        expect(fsUtils.createFile).toHaveBeenCalledWith(
            "/app/vitest.config.ts",
            expect.any(String)
        );

        expect(fsUtils.createFile).toHaveBeenCalledWith(
            "/app/vitest.setup.ts",
            expect.stringContaining("@testing-library/jest-dom")
        );
    });

    it("should add vitest globals to tsconfig.json", () => {
        (fsUtils.pathExists as jest.Mock).mockImplementation((p: string) =>p === "/app/tsconfig.json");

        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({compilerOptions: { types: [] },}));

        const builder = new TestsBuilder({ git: true });
        builder.setBasePathAndCreateConfigViTest();

        const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
        const parsed = JSON.parse(writtenContent);

        expect(parsed.compilerOptions.types).toContain("vitest/globals");
    });

    it("should inject vitest scripts into package.json", () => {
        (fsUtils.pathExists as jest.Mock).mockImplementation((p: string) => p === "/app/package.json");

        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ scripts: {} }));

        const builder = new TestsBuilder({ git: true });
        builder.setBasePathAndCreateConfigViTest();

        const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
        const parsed = JSON.parse(writtenContent);

        expect(parsed.scripts.test).toBe("vitest");
        expect(parsed.scripts["test:ui"]).toBe("vitest --ui");
        expect(parsed.scripts["test:run"]).toBe("vitest run");
        expect(parsed.scripts["test:coverage"]).toBe("vitest run --coverage");
    });

    it("should create playwright config and e2e directory", () => {
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);

        const builder = new TestsBuilder({ git: true });
        builder.setBasePathAndCreatePlaywrightConfigTest();

        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/playwright.config.ts",expect.any(String));
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/tests/e2e");
    });

    it("should inject playwright scripts into package.json", () => {
        (fsUtils.pathExists as jest.Mock).mockImplementation((p: string) => p === "/app/package.json");
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ scripts: {} }));

        const builder = new TestsBuilder({ git: true });
        builder.setBasePathAndCreatePlaywrightConfigTest();

        const writtenContent = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
        const parsed = JSON.parse(writtenContent);

        expect(parsed.scripts.e2e).toBe("playwright test");
        expect(parsed.scripts["e2e:headed"]).toBe("playwright test --headed");
        expect(parsed.scripts["e2e:report"]).toBe("playwright show-report");
    });

    it("should not crash when tsconfig.json does not exist", () => {
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);

        const builder = new TestsBuilder({ git: true });

        expect(() => builder.setBasePathAndCreateConfigViTest()).not.toThrow();
    });

    it("should not crash when package.json does not exist", () => {
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);

        const builder = new TestsBuilder({ git: true });

        expect(() => builder.setBasePathAndCreatePlaywrightConfigTest()).not.toThrow();
    });

});
