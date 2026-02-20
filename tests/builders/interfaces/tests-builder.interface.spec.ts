import { ITestsBuilder } from "../../../src/builders/interfaces/tests-builder.interface";

describe("ITestsBuilder interface", () => {
    let testsBuilder: ITestsBuilder;

    beforeAll(() => {
        testsBuilder = {
            installDependencesViTestRequired() { return this; },
            installDependencesPlaywrightTestRequired() { return this; },
            setBasePathAndCreateConfigViTest() { return this; },
            setBasePathAndCreatePlaywrightConfigTest() { return this; },
            build() { }
        };
    });

    it("should have the correct methods", () => {
        expect(typeof testsBuilder.installDependencesViTestRequired).toBe("function");
        expect(typeof testsBuilder.installDependencesPlaywrightTestRequired).toBe("function");
        expect(typeof testsBuilder.setBasePathAndCreateConfigViTest).toBe("function");
        expect(typeof testsBuilder.setBasePathAndCreatePlaywrightConfigTest).toBe("function");
        expect(typeof testsBuilder.build).toBe("function");
    });

    it("should have 5 methods", () => {
        const methodCount = Object.keys(testsBuilder).length;
        expect(methodCount).toBe(5);
    });
});
