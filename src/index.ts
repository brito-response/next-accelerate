#!/usr/bin/env node
import { createFormForResource, createResource } from "./commands";

export function main(args: string[]) {
    const [, , command, arg] = args;

    switch (command) {
        case "create":
            createResource(arg);
            break;
        case "create:form":
            createFormForResource(arg);
            break;

        case "--help":
            console.log("Comandos disponíveis:");
            console.log("  create <resource-name> - Cria um novo recurso");
            console.log("  create:form <resource-name> - Cria um novo formulário para o recurso");
            break;

        default:
            console.log("Comando não reconhecido");
    };
};

main(process.argv); 