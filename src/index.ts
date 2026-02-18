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
            console.log("commands available in the cli:");
            console.log("  create <resource-name> - creates all folders for a new resource.");
            console.log("  create:components - create components resource.");
            console.log("  create:form <resource-name> - creates a new form for the resource");
            console.log("  config:next-auth - creates a new form for the resource");
            console.log("  create:api-commons - creates commons api resource");
            console.log("  create:api-resource <resource-name> - creates a new api resource");
            break;
        default:
            console.log("command unavailable in the cli...");
    };
};

main(process.argv);