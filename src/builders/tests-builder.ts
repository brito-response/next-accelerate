import path from "node:path";
import fs from "node:fs";
import { ITestsBuilder } from "./interfaces/tests-builder.interface";
import { BuilderOptions } from "../utils/contracts/build-options";
import { gitCommit } from "../utils/services/git.service";
import { createDir, createFile, pathExists } from "../utils/fs";
import { nextConfigViTestTemplate } from "../templates/tests";
import { DependencyTetsUnitInstaller } from "../utils/services/install-tests-unit-dependences.service";
import { DependencyTetsE2EInstaller } from "../utils/services/install-tests-e2e-dependences.service";
import { nextConfigPlaywightTestTemplate } from "../templates/tests/config-playwright";

export class TestsBuilder implements ITestsBuilder {
    private basePath!: string;
    private readonly options?: BuilderOptions;

    constructor(options?: BuilderOptions) {
        this.options = options;
    }

    private createCommit(message: string) {
        if (!this.options?.git) return;
        gitCommit(message);
    }

    installDependencesViTestRequired() {
        DependencyTetsUnitInstaller.getInstance().install();
        return this;
    }

    installDependencesPlaywrightTestRequired() {
        DependencyTetsE2EInstaller.getInstance().install();
        return this;
    }

    setBasePathAndCreateConfigViTest() {
        this.basePath = path.join(process.cwd())
        const vitestConfigPath = path.join(this.basePath, "vitest.config.ts");
        createFile(vitestConfigPath, nextConfigViTestTemplate());

        const setupPath = path.join(this.basePath, "vitest.setup.ts");
        createFile(setupPath, 'import "@testing-library/jest-dom";\n');

        // adjust tsconfig
        const tsconfigPath = path.join(this.basePath, "tsconfig.json");
        if (pathExists(tsconfigPath)) {
            const tsconfigRaw = fs.readFileSync(tsconfigPath, "utf-8");
            const tsconfig = JSON.parse(tsconfigRaw);

            tsconfig.compilerOptions = tsconfig.compilerOptions || {};
            tsconfig.compilerOptions.types = tsconfig.compilerOptions.types || [];
            if (!tsconfig.compilerOptions.types.includes("vitest/globals")) {
                tsconfig.compilerOptions.types.push("vitest/globals");
            }

            fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        }

        // adjust package.json scripts
        const packageJsonPath = path.join(this.basePath, "package.json");
        if (pathExists(packageJsonPath)) {
            const packageJsonRaw = fs.readFileSync(packageJsonPath, "utf-8");
            const packageJson = JSON.parse(packageJsonRaw);

            packageJson.scripts = packageJson.scripts || {};
            packageJson.scripts["test"] = "vitest";
            packageJson.scripts["test:ui"] = "vitest --ui";
            packageJson.scripts["test:run"] = "vitest run";
            packageJson.scripts["test:coverage"] = "vitest run --coverage";

            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        }

        if (this.options?.git) this.createCommit("chore(tests-unit): setup Vitest and testing-library");
        return this;
    }

    setBasePathAndCreatePlaywrightConfigTest() {
        this.basePath = path.join(process.cwd())
        const playwrightConfigPath = path.join(this.basePath, "playwright.config.ts");
        createFile(playwrightConfigPath, nextConfigPlaywightTestTemplate());

        const e2ePath = path.join(this.basePath, "tests", "e2e");
        createDir(e2ePath);

        // adjust package.json scripts
        const packageJsonPath = path.join(this.basePath, "package.json");
        if (pathExists(packageJsonPath)) {
            const packageJsonRaw = fs.readFileSync(packageJsonPath, "utf-8");
            const packageJson = JSON.parse(packageJsonRaw);

            packageJson.scripts = packageJson.scripts || {};

            packageJson.scripts["e2e"] = "playwright test";
            packageJson.scripts["e2e:headed"] = "playwright test --headed";
            packageJson.scripts["e2e:report"] = "playwright show-report";

            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        }

        if (this.options?.git) this.createCommit("chore(tests): setup Playwright E2E");

        return this;
    }

    build() {
        if (!this.options?.git) return;
        console.log("commits made successfully ✨")
    };

};
