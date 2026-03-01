import path from "node:path";
import { BuilderOptions } from "../utils/contracts/build-options";
import { gitCommit } from "../utils/services/git.service";
import { createDir, createFile, moveFile, pathExists } from "../utils/fs";
import { environmentTemplate, formForgotTemplate, formLoginTemplate, formLoginWrapperTemplate, formRedefTemplate, formRegisterTemplate, formUpdateUserTemplate, managerContextTemplate, managerPageTemplate, nextConfigTemplate, nextDecodeClaimsTemplate, nextRequestApiTemplate, nextSessionTypeTemplate, utilsTypeTemplate } from "../templates";
import { INextAuthBuilder } from "./interfaces/next-auth-builder.interface";
import { formSchemeLoginTemplate, formSchemeRedefTemplate, formSchemeRegisterTemplate, formSchemeUpdateUserTemplate } from "../templates/forms/schems";
import { hiddenPathsTemplate } from "../templates/config/hiddenpaths";
import { proxyTemplate } from "../templates/config/proxy";
import { captureErrorLayoutTemplate, mainLayoutTemplate, managerLayoutCssTemplate, managerLayoutTemplate, privateNextLayoutTemplate, publicLayoutTemplate, rootLayoutMinimalTemplate } from "../templates/layouts";
import { buttonGenericTemplate, footerTemplate, headerTemplate, menuAsideTemplate } from "../templates/components";
import { DependencyFramemotionAndNextAuthInstaller } from "../utils/services/install-nextauth-motion.service";

export class NextAuthBuilder implements INextAuthBuilder {
    private basePath!: string;
    private readonly options?: BuilderOptions;

    constructor(options?: BuilderOptions) {
        this.options = options;
    }

    private createCommit(message: string) {
        if (!this.options?.git) return;
        gitCommit(message);
    }

    installDependencesRequired() {
        DependencyFramemotionAndNextAuthInstaller.getInstance().install();
        return this;
    }

    setBasePathAndCreateConfig() {
        this.basePath = path.join(process.cwd(), "src/app/api/auth/[...nextauth]");
        createDir(this.basePath);
        if (!pathExists(this.basePath)) {
            console.error("\x1b[31m ✖ Erro \x1b[0m creating NextAuth config directory.");
            process.exit(1);
        };

        createFile(path.join(this.basePath, "route.ts"), nextConfigTemplate());
        if (this.options?.git) this.createCommit("feat(next-auth): create config route.");

        return this;
    }

    createNextAuthAuxOptions() {
        this.basePath = path.join(process.cwd(), "src/app/api/auth/");

        createFile(path.join(this.basePath, "decode-claims.ts"), nextDecodeClaimsTemplate());
        createFile(path.join(this.basePath, "request-api.ts"), nextRequestApiTemplate());

        this.basePath = path.join(process.cwd(), "src/utils");
        createDir(this.basePath);

        if (!pathExists(this.basePath)) { throw new Error(`Failed to create directory at ${this.basePath}`); };
        createFile(path.join(this.basePath, "route.ts"), nextSessionTypeTemplate());

        if (!pathExists(this.basePath)) { throw new Error(`Failed to create directory at ${this.basePath}`); };
        createFile(path.join(this.basePath, "utils.ts"), utilsTypeTemplate());

        if (this.options?.git) this.createCommit("feat(next-auth): create aux options for login sessions.");
        return this;
    }

    createNextAuthForms() {
        const forms: { name: string; template: () => string; scheme: () => string }[] = [
            { name: "FormForgot", template: formForgotTemplate, scheme: () => "" },
            { name: "FormLogin", template: formLoginTemplate, scheme: formSchemeLoginTemplate },
            { name: "FormRedef", template: formRedefTemplate, scheme: formSchemeRedefTemplate },
            { name: "FormRegister", template: formRegisterTemplate, scheme: formSchemeRegisterTemplate },
            { name: "FormUpdateUser", template: formUpdateUserTemplate, scheme: formSchemeUpdateUserTemplate },
        ];

        const formsRoot = path.join(process.cwd(), "src/forms");
        const usersPath = path.join(formsRoot, "users");
        let created = false;

        if (!pathExists(formsRoot)) { createDir(formsRoot); created = true; };
        if (!pathExists(usersPath)) { createDir(usersPath); created = true; };

        forms.forEach(({ name, template, scheme }) => {
            const formDir = path.join(usersPath, name);

            if (!pathExists(formDir)) { createDir(formDir); created = true; };
            const filePath = path.join(formDir, "index.tsx");

            if (!pathExists(filePath)) { createFile(filePath, template()); created = true; };
            const schemePath = path.join(formDir, `${name.toLocaleLowerCase() + "-scheme"}.tsx`);

            if (!pathExists(schemePath)) { createFile(schemePath, scheme()); created = true; };
        });

        this.basePath = path.join(process.cwd(), "src/forms/users/FormLogin");
        createFile(path.join(this.basePath, "formwraper.tsx"), formLoginWrapperTemplate());
        createFile(path.join(this.basePath, "hidenpath.ts"), hiddenPathsTemplate());

        const indexPath = path.join(usersPath, "index.ts");

        if (!pathExists(indexPath)) {
            const exports = forms.map(({ name }) => `export { ${name} } from "./${name}";`).join("\n");
            createFile(indexPath, exports + "\n");
            created = true;
        }

        if (created && this.options?.git) { this.createCommit("feat(auth): create next-auth user forms"); }
        return this;
    }

    createNextLayouts() {
        const layoutsRoot = path.join(process.cwd(), "src/components/Layouts");
        let created = false;

        if (!pathExists(layoutsRoot)) {
            createDir(layoutsRoot);
            created = true;
        }

        const layouts = [
            { name: "LayoutCaptureError", files: [{ name: "index.tsx", content: captureErrorLayoutTemplate() }] },
            { name: "MainLayout", files: [{ name: "index.tsx", content: mainLayoutTemplate() }] },
            { name: "ManagerLayout", files: [{ name: "index.tsx", content: managerLayoutTemplate() }, { name: "grid.module.css", content: managerLayoutCssTemplate() }] }
        ];

        layouts.forEach(layout => {
            const layoutDir = path.join(layoutsRoot, layout.name);
            if (!pathExists(layoutDir)) { createDir(layoutDir); created = true; };

            layout.files.forEach(file => {
                const filePath = path.join(layoutDir, file.name);
                if (!pathExists(filePath)) {
                    createFile(filePath, file.content);
                    created = true;
                }
            });
        });

        if (created && this.options?.git) this.createCommit("feat(next-auth): compoenets for authentication system.");
        return this;
    }

    setLayouts() {
        const appRoot = path.join(process.cwd(), "src/app");
        const publicsDir = path.join(appRoot, "(publics)");
        const privatesDir = path.join(appRoot, "(privates)");
        const managerDir = path.join(privatesDir, "manager");

        let created = false;

        // create publics
        if (!pathExists(publicsDir)) { createDir(publicsDir); created = true; }

        // create privates
        if (!pathExists(privatesDir)) { createDir(privatesDir); created = true; }

        // create manager
        if (!pathExists(managerDir)) { createDir(managerDir); created = true; }

        // ensure root layout exists (create minimal if missing)
        const rootLayout = path.join(appRoot, "layout.tsx");
        if (!pathExists(rootLayout)) {
            createFile(rootLayout, rootLayoutMinimalTemplate());
            created = true;
        }

        const rootPage = path.join(appRoot, "page.tsx");
        const publicsPage = path.join(publicsDir, "page.tsx");

        if (pathExists(rootPage) && !pathExists(publicsPage)) {
            moveFile(rootPage, publicsPage);
            created = true;
        }

        // create publics layout
        const publicsLayout = path.join(publicsDir, "layout.tsx");
        if (!pathExists(publicsLayout)) {
            createFile(publicsLayout, publicLayoutTemplate());
            created = true;
        }

        // create private layout
        const privateLayoutPath = path.join(privatesDir, "layout.tsx");
        if (!pathExists(privateLayoutPath)) {
            createFile(privateLayoutPath, privateNextLayoutTemplate());
            created = true;
        }

        // create manager page
        const managerPagePath = path.join(managerDir, "page.tsx");
        if (!pathExists(managerPagePath)) {
            createFile(managerPagePath, managerPageTemplate());
            created = true;
        }

        if (created && this.options?.git) { this.createCommit("feat(app-router): created private and publics route groups"); };

        return this;
    };

    createComponentsAux() {
        const root = process.cwd();
        const contextsDir = path.join(root, "src/contexts");
        const componentsDir = path.join(root, "src/components");

        const headerDir = path.join(componentsDir, "Header");
        const footerDir = path.join(componentsDir, "Footer");
        const menuAsideDir = path.join(componentsDir, "MenuAside");
        const buttonGenericDir = path.join(componentsDir, "ButtonGeneric");

        let created = false;

        // create context
        if (!pathExists(contextsDir)) { createDir(contextsDir); created = true; };
        const managerContextPath = path.join(contextsDir, "manager-context.tsx");
        if (!pathExists(managerContextPath)) {
            createFile(managerContextPath, managerContextTemplate());
            created = true;
        }

        // create compoenets
        if (!pathExists(componentsDir)) {
            createDir(componentsDir);
            created = true;
        }

        const components = [
            { dir: headerDir, template: headerTemplate() },
            { dir: footerDir, template: footerTemplate() },
            { dir: menuAsideDir, template: menuAsideTemplate() },
            { dir: buttonGenericDir, template: buttonGenericTemplate() }
        ];

        components.forEach(component => {
            if (!pathExists(component.dir)) {
                createDir(component.dir);
                created = true;
            }

            const indexPath = path.join(component.dir, "index.tsx");

            if (!pathExists(indexPath)) {
                createFile(indexPath, component.template);
                created = true;
            }
        });

        if (created && this.options?.git) { this.createCommit("feat(core): create manager context and essential layout components"); };

        return this;
    }

    createNextAutorizationSystem() {
        this.basePath = path.join(process.cwd(), "src");
        createFile(path.join(this.basePath, "proxy.ts"), proxyTemplate());
        if (this.options?.git) this.createCommit("feat(next-auth): create proxy for autorize users in frontend.");
        return this;
    }

    setEnvironmentVariable() {
        this.basePath = path.join(process.cwd());
        createFile(path.join(this.basePath, ".env.local"), environmentTemplate());
        return this;
    }

    build() {
        if (!this.options?.git) return;
        console.log("commits made successfully ✨")
    };

};
