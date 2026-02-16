import fs from "node:fs";
import { hasDependency } from "../src/utils/guards/dependency.guard";

jest.mock("node:fs");

describe("hasDependency", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(process, "cwd").mockReturnValue("/app");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should terminate if package.json does not exist", () => {
        // when
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        jest.spyOn(console, "error").mockImplementation(() => { });
        jest.spyOn(process, "exit").mockImplementation((code?: string | number | null | undefined) => { throw new Error(`process.exit: ${code}`); });

        expect(() => hasDependency("next")).toThrow("process.exit: 1"); // then
    });

    it("should return false if dependency is not found", () => {
        // given
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ dependencies: { react: "^18.2.0", }, }));

        const result = hasDependency("next"); // when run
        expect(result).toBe(false); // then
    });

    it("should return true if dependency exists in dependencies", () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);

        (fs.readFileSync as jest.Mock).mockReturnValue(
            JSON.stringify({
                dependencies: {
                    next: "14.1.0",
                },
            })
        );

        expect(hasDependency("next")).toBe(true);
    });

    it("should return true if dependency exists in devDependencies", () => {
        // when
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ devDependencies: { next: "14.1.0" } }));

        expect(hasDependency("next")).toBe(true); //then 
    });

    it("should return true if dependency exists in peerDependencies", () => {
        // when
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ peerDependencies: { next: "14.1.0" } }));

        expect(hasDependency("next")).toBe(true); // then
    });

});
