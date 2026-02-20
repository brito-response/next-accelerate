#!/usr/bin/env node
import { createFormForResource, createNextAutResource, createResource, createTestE2EConfig, createTestUnitConfig } from "./commands";
import { createApiResource, createCommonsApiResource } from "./commands/create-api-resource";
import { createComponents } from "./commands/create-resource";
import { useArgsInterceptor } from "./utils/interceptors/args.interceptor";

export function main(args: string[]) {
    const { command, resource, flags } = useArgsInterceptor(args);

    const options = {
        git: flags.includes("--git"),
        test: flags.includes("--test"),
        json: flags.includes("--json"),
    };

    switch (command) {
        case "create":
            createResource(resource, options);
            break;
        case "create:components":
            createComponents(options);
            break;
        case "create:form":
            createFormForResource(resource, options);
            break;
        case "config:next-auth":
            createNextAutResource(options);
            break;
        case "create:api-commons":
            createCommonsApiResource(options);
            break;
        case "create:api-resource":
            createApiResource(resource, options);
            break;
        case "config:tests-unit":
            createTestUnitConfig(options);
            break;
        case "config:tests-e2e":
            createTestE2EConfig(options);
            break;
        case "-help":
            console.log("\n\n\x1b[35mcommands available in the cli: \x1b[0m");
            console.log("  \x1b[32mcreate\x1b[0m \x1b[33mresource_name\x1b[0m                          -> creates all folders for a new resource.");
            console.log("  \x1b[32mcreate:components\x1b[0m                             -> create components resource.");
            console.log("  \x1b[32mcreate:form\x1b[0m \x1b[33mresource_name\x1b[0m                     -> creates a new form for the resource.");
            console.log("  \x1b[32mconfig:next-auth\x1b[0m                              -> create configuration for next auth.");
            console.log("  \x1b[32mcreate:api-commons\x1b[0m                            -> create common resources for using api routes.");
            console.log("  \x1b[32mcreate:api-resource\x1b[0m \x1b[33mresource-name\x1b[0m             -> creates a new api resource.");
            console.log("  \x1b[32mconfig:tests-unit\x1b[0m                             -> config tests unit with vitest.");
            console.log("  \x1b[32mconfig:tests-e2e\x1b[0m                              -> config tests end to end with playwright.");
            console.log("\n\n");
            break;
        default:
            console.log("command unavailable in the cli...");
    };
};

main(process.argv);