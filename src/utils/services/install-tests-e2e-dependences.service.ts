import { execSync } from "node:child_process";
import { hasDependency } from "../guards";

export class DependencyTetsE2EInstaller {
    private static instance: DependencyTetsE2EInstaller;
    private constructor() { }

    public static getInstance(): DependencyTetsE2EInstaller {
        if (!DependencyTetsE2EInstaller.instance) {
            DependencyTetsE2EInstaller.instance = new DependencyTetsE2EInstaller();
        }
        return DependencyTetsE2EInstaller.instance;
    }

    private hasInstalled = false;

    public async install() {
        if (this.hasInstalled || hasDependency("react-hook-form")) return;
        this.hasInstalled = true;

        try {
            execSync(`npm install -D @playwright/test`, { stdio: "inherit" });
            console.log("Dependências instaladas com sucesso!");
        } catch (error) {
            console.error("Falha ao instalar dependências:", error);
        };
    };
};