import { execSync } from "node:child_process";
import { hasDependency } from "../guards";

export class DependencyFramemotionAndNextAuthInstaller {
    private static instance: DependencyFramemotionAndNextAuthInstaller;
    private constructor() { }

    public static getInstance(): DependencyFramemotionAndNextAuthInstaller {
        if (!DependencyFramemotionAndNextAuthInstaller.instance) {
            DependencyFramemotionAndNextAuthInstaller.instance = new DependencyFramemotionAndNextAuthInstaller();
        }
        return DependencyFramemotionAndNextAuthInstaller.instance;
    }

    private hasInstalled = false;

    public async install() {
        if (this.hasInstalled || hasDependency("framer-motion")) return;
        this.hasInstalled = true;

        try {
            execSync(`npm install framer-motion && 
                npm install next-auth &&
                npm install jwt-decode &&
                npm install --save-dev @types/jwt-decode
                `, { stdio: "inherit" });
            console.log("Dependências instaladas com sucesso!");
        } catch (error) {
            console.error("Falha ao instalar dependências:", error);
        };
    };
};