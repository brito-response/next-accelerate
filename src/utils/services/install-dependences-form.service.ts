import { execSync } from "node:child_process";
import { hasDependency } from "../guards";

export class DependencyFormInstaller {
    private static instance: DependencyFormInstaller;
    private constructor() {}

    public static getInstance(): DependencyFormInstaller {
        if (!DependencyFormInstaller.instance) {
            DependencyFormInstaller.instance = new DependencyFormInstaller();
        }
        return DependencyFormInstaller.instance;
    }

    private hasInstalled = false;

    public async install() {
        if (this.hasInstalled ||  hasDependency("react-hook-form")) return;
        this.hasInstalled = true;

        try {
            execSync(`
                npm install react-hook-form &&
                npm install yup @hookform/resolvers &&
                npm install -D @types/yup &&
                npm install react-toastify
            `, { stdio: "inherit" });
            console.log("Dependências instaladas com sucesso!");
        } catch (error) {
            console.error("Falha ao instalar dependências:", error);
        };
    };
};