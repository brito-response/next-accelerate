#!/usr/bin/env node
import { createFormForResource, createNextAutResource, createResource } from "./commands";
import { createApiResource, createCommonsApiResource } from "./commands/create-api-resource";
import { createComponents } from "./commands/create-resource";
import { useArgsInterceptor } from "./utils/interceptors/args.interceptor";

export function main(args: string[]) {
    const { command, resource, flags } = useArgsInterceptor(args);
    const useGit = flags.includes("--git");

    switch (command) {
        case "create":
            createResource(resource, { git: useGit });
            break;
        case "create:components":
            createComponents({ git: useGit });
            break;
        case "create:form":
            createFormForResource(resource, { git: useGit });
            break;
        case "config:next-auth":
            createNextAutResource({ git: useGit });
            break;
        case "create:api-commons":
            createCommonsApiResource({ git: useGit });
            break;
        case "create:api-resource":
            createApiResource(resource, { git: useGit });
            break;
        case "-help":
            console.log("\n\n\x1b[35mcommands available in the cli: \x1b[0m");
            console.log("  \x1b[32mcreate\x1b[0m \x1b[33mresource_name\x1b[0m                          -> creates all folders for a new resource.");
            console.log("  \x1b[32mcreate:components\x1b[0m                             -> create components resource.");
            console.log("  \x1b[32mcreate:form\x1b[0m \x1b[33mresource_name\x1b[0m                     -> creates a new form for the resource");
            console.log("  \x1b[32mconfig:next-auth\x1b[0m                              -> creates a new form for the resource");
            console.log("  \x1b[32mcreate:api-commons\x1b[0m                            -> creates commons api resource");
            console.log("  \x1b[32mcreate:api-resource\x1b[0m \x1b[33mresource-name\x1b[0m             -> creates a new api resource");
            console.log("\n\n");
            break;
        default:
            console.log("command unavailable in the cli...");
    };
};

main(process.argv);