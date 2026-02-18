import { NextResourceApiBuilder } from "../builders/resource-api-builder";
import { nextProjectGuardSimple } from "../utils/guards";

export function createCommonsApiResource(options?: { git?: boolean }) {
    nextProjectGuardSimple();
    const builder = new NextResourceApiBuilder("default", options);
    builder.setDefaultPath().createCommonsApi().createDefaultUsersApi().build();

    console.log(`the resources "$commons created \x1b[32m✔ Success\x1b[0m`);
};

export function createApiResource(inputName?: string, options?: { git?: boolean }) {
    nextProjectGuardSimple();

    if (!inputName) {
        console.error("\x1b[31m ✖ Erro \x1b[0mPlease provide the resource name.");
        process.exit(1);
    }

    const builder = new NextResourceApiBuilder(inputName, options);
    builder.setBasePath().createCommonsApi().createDefaultUsersApi().createResourceCrudApi().build();

    console.log(`the resources "${inputName}" created \x1b[32m✔ Success\x1b[0m`);
};


