import { execSync } from "node:child_process";
import { hasDependency } from "../guards";

export class DependencyFramemotionInstaller {
    private static instance: DependencyFramemotionInstaller;
    private constructor() { }

    public static getInstance(): DependencyFramemotionInstaller {
        if (!DependencyFramemotionInstaller.instance) {
            DependencyFramemotionInstaller.instance = new DependencyFramemotionInstaller();
        }
        return DependencyFramemotionInstaller.instance;
    }

    private hasInstalled = false;

    public async install() {
        if (this.hasInstalled || hasDependency("framer-motion")) return;
        this.hasInstalled = true;

        try {
            execSync(`npm install framer-motion`, { stdio: "inherit" });
            console.log("Dependências instaladas com sucesso!");
        } catch (error) {
            console.error("Falha ao instalar dependências:", error);
        };
    };
};