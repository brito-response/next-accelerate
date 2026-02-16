import { DependencyInstaller } from "../../src/utils/services/install-dependences.service";
import { execSync } from "node:child_process";

jest.mock("node:child_process", () => ({
    execSync: jest.fn(),
}));

describe("DependencyInstaller singleton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call install only once even if called multiple times", async () => {
        const installer1 = DependencyInstaller.getInstance();
        const installer2 = DependencyInstaller.getInstance();

        expect(installer1).toBe(installer2);

        await installer1.install();
        await installer2.install();
        await installer1.install();

        expect(execSync).toHaveBeenCalledTimes(1);
    });
});
