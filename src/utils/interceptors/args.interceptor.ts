type ParsedArgs = { command: string; resource?: string; flags: string[] };
const ALLOWED_FLAGS = new Set(["--git", "--test", "--json"]);

export function useArgsInterceptor(args: string[]): ParsedArgs {
    const [, , ...input] = args;

    if (input.length === 0) {
        console.error("\x1b[31m ✖ Erro \x1b[0mNo command was entered.");
        process.exit(1);
    }

    const command = input[0];

    if (command.startsWith("-") && command !== "-help") {
        console.error("\x1b[31m ✖ Erro \x1b[0mInvalid command");
        process.exit(1);
    }

    const rest = input.slice(1);

    let resource: string | undefined;
    const flags: string[] = [];

    for (const token of rest) {
        if (token.startsWith("-")) {
            if (ALLOWED_FLAGS.has(token)) {
                flags.push(token);
                continue;
            }

            if (!resource) {
                console.error("\x1b[31m ✖ Erro \x1b[0mInvalid resource name");
                process.exit(1);
            }

            console.error(`\x1b[31m ✖ Erro \x1b[0mUnknown flag: ${token}`);
            process.exit(1);
        }

        if (!resource) {
            resource = token;
            continue;
        }

        console.error("\x1b[31m ✖ Erro \x1b[0mNo additional arguments are allowed.");
        process.exit(1);
    }

    return { command, resource, flags };
};
