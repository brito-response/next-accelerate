import { useArgsInterceptor } from "../../src/utils/interceptors/args.interceptor";

describe("useArgsInterceptor", () => {
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(((code?: number) => { throw new Error(`process.exit: ${code}`); }) as never);

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => { exitSpy.mockRestore(); errorSpy.mockRestore(); });

    it("should parse command and resource correctly", () => {
        const args = ["node", "cli", "create", "user"]; // given
        const result = useArgsInterceptor(args); // when
        expect(result).toEqual({ command: "create", resource: "user", flags: [], }); // then
    });

    it("should parse command, resource and --git flag", () => {
        const args = ["node", "cli", "create", "user", "--git"]; // given
        const result = useArgsInterceptor(args); // when
        expect(result).toEqual({ command: "create", resource: "user", flags: ["--git"] }); // then
    });

    it("should allow flag before resource", () => {
        const args = ["node", "cli", "create", "--git", "user"]; // given
        const result = useArgsInterceptor(args); // when
        expect(result).toEqual({ command: "create", resource: "user", flags: ["--git"] }); // then
    });

    it("should accept -help as a valid command", () => {
        const args = ["node", "cli", "-help"];  // given
        const result = useArgsInterceptor(args); // when
        expect(result).toEqual({ command: "-help", resource: undefined, flags: [] }); // then
    });

    it("should exit when no command is provided", () => {
        const args = ["node", "cli"];// when

        // then
        expect(() => useArgsInterceptor(args)).toThrow("process.exit: 1");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mNo command was entered.");
    });

    it("should exit when command starts with dash and is not -help", () => {
        // given
        const args = ["node", "cli", "--create"];

        // then
        expect(() => useArgsInterceptor(args)).toThrow("process.exit: 1");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mInvalid command");
    });

    it("should exit when resource starts with dash", () => {
        const args = ["node", "cli", "create", "--user"]; // when

        //  then
        expect(() => useArgsInterceptor(args)).toThrow("process.exit: 1");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mInvalid resource name");
    });

    it("should exit when unknown flag is provided", () => {
        const args = ["node", "cli", "create", "user", "--force"]; // when

        // then
        expect(() => useArgsInterceptor(args)).toThrow("process.exit: 1");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mUnknown flag: --force");
    });

    it("should exit when extra arguments are provided", () => {
        const args = ["node", "cli", "create", "user", "post"];  // when

        // then
        expect(() => useArgsInterceptor(args)).toThrow("process.exit: 1");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mNo additional arguments are allowed.");
    });

    it("should exit when extra token appears after resource and flag", () => {
        const args = ["node", "cli", "create", "user", "--git", "extra"]; // when

        //  then
        expect(() => useArgsInterceptor(args)).toThrow("process.exit: 1");
        expect(console.error).toHaveBeenCalledWith("\x1b[31m ✖ Erro \x1b[0mNo additional arguments are allowed.");
    });
});
