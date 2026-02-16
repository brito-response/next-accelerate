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
        if (this.hasInstalled ||  hasDependency("react-hook-form")) return;
        this.hasInstalled = true;

        try {
            execSync(`
                npm install lucide-react &&
                npm install next-auth &&
                npm install jwt-decode &&
                npm install --save-dev @types/jwt-decode &&
                npm install clsx &&
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