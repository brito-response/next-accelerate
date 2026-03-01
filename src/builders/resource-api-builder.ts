import path from "node:path";
import { capitalize } from "../utils/string";
import { createDir, createFile, pathExists } from "../utils/fs";
import { BuilderOptions } from "../utils/contracts/build-options";
import { createResourceTemplate, deleteTemplate, imageUploadTemplate, updateResourceTemplate, usersCreateTemplate, usersPhotoTemplate, usersUpdateTemplate } from "../templates";
import { INextApiBuilder } from "./interfaces/resource-api-builder.interface";
import { NextAccelerateBuilder } from "./core/next-accelerate-builder";

export class NextResourceApiBuilder extends NextAccelerateBuilder implements INextApiBuilder {

    constructor(inputName: string, options?: BuilderOptions) {
        super(inputName, options);
    }

    setDefaultPath() {
        this.basePath = path.join(process.cwd(), "src/app/api");
        if (pathExists(this.basePath)) return this;
        createDir(this.basePath);
        return this;
    }

    setBasePath() {
        this.basePath = path.join(process.cwd(), "src/app/api", this.resource);
        if (pathExists(this.basePath)) return this;
        createDir(this.basePath);
        return this;
    }

    createCommonsApi() {
        const apiBase = path.join(process.cwd(), "src/app/api");
        const imagesBase = path.join(apiBase, "images");
        const deleteBase = path.join(apiBase, "delete");

        // se já existir infra -> não faz nada
        if (pathExists(imagesBase) || pathExists(deleteBase)) {
            console.log("\x1b[36mℹ Common API routes already initialized. Skipping...\x1b[0m");
            return this;
        }

        // images
        const imageRoutePath = path.join(imagesBase, "[resource]", "[resourceId]");
        createDir(imageRoutePath);
        createFile(path.join(imageRoutePath, "route.ts"), imageUploadTemplate());

        // delete
        const deleteRoutePath = path.join(deleteBase, "[resource]", "[resourceId]");
        createDir(deleteRoutePath);
        createFile(path.join(deleteRoutePath, "route.ts"), deleteTemplate());

        if (this.options?.git) this.createCommit("feat(api): add common resource routes");
        return this;
    }

    createDefaultUsersApi() {
        const apiBase = path.join(process.cwd(), "src/app/api/users");

        // raiz users
        createDir(apiBase); createFile(path.join(apiBase, "route.ts"), usersCreateTemplate());

        // users/photo
        const photoPath = path.join(apiBase, "photo");
        createDir(photoPath);
        createFile(path.join(photoPath, "route.ts"), usersPhotoTemplate());

        // users/update
        const updatePath = path.join(apiBase, "update");
        createDir(updatePath);
        createFile(path.join(updatePath, "route.ts"), usersUpdateTemplate());

        if (this.options?.git) this.createCommit("feat(api): add resources for users api");
        return this;
    }

    createResourceCrudApi() {
        const resourceBase = path.join(process.cwd(), "src/app/api", this.resource);
        createDir(resourceBase);

        // CREATE
        createFile(path.join(resourceBase, "route.ts"), createResourceTemplate(capitalize(this.resource)));

        // UPDATE
        const paramFolder = `[${this.singular}Id]`;
        const updatePath = path.join(resourceBase, paramFolder);

        createDir(updatePath);
        createFile(path.join(updatePath, "route.ts"), updateResourceTemplate(capitalize(this.singular), capitalize(this.resource)));

        if (this.options?.git) this.createCommit(`feat(api/${this.resource}): add create and update routes`);
        return this;
    }
};

