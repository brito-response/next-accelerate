import { execSync } from "node:child_process";
import { hasDependency } from "../guards";

export class DependencyInstaller {
    private static instance: DependencyInstaller;
    private constructor() {}

    public static getInstance(): DependencyInstaller {
        if (!DependencyInstaller.instance) {
            DependencyInstaller.instance = new DependencyInstaller();
        }
        return DependencyInstaller.instance;
    }

    private hasInstalled = false;

    public async install() {
        if (this.hasInstalled ||  hasDependency("lucide-react")) return;
        this.hasInstalled = true;

        try {
            execSync(`
                npm install lucide-react &&
                npm install clsx
            `, { stdio: "inherit" });
            console.log("Dependências instaladas com sucesso!");
        } catch (error) {
            console.error("Falha ao instalar dependências:", error);
        };
    };
};