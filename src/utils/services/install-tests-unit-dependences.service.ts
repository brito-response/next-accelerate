import { execSync } from "node:child_process";
import { hasDependency } from "../guards";

export class DependencyTetsUnitInstaller {
    private static instance: DependencyTetsUnitInstaller;
    private constructor() { }

    public static getInstance(): DependencyTetsUnitInstaller {
        if (!DependencyTetsUnitInstaller.instance) {
            DependencyTetsUnitInstaller.instance = new DependencyTetsUnitInstaller();
        }
        return DependencyTetsUnitInstaller.instance;
    }

    private hasInstalled = false;

    public async install() {
        if (this.hasInstalled || hasDependency("react-hook-form")) return;
        this.hasInstalled = true;

        try {
            execSync(`
                npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/node @vitest/ui @vitest/coverage-v8 
            `, { stdio: "inherit" });
            console.log("Dependências instaladas com sucesso!");
        } catch (error) {
            console.error("Falha ao instalar dependências:", error);
        };
    };
};