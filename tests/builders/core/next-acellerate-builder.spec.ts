import { NextAccelerateBuilder } from "../../../src/builders/core/next-accelerate-builder";
import { gitCommit } from "../../../src/utils/services/git.service";

jest.mock("../../../src/utils/services/git.service", () => ({
    gitCommit: jest.fn(),
}));

class TestBuilder extends NextAccelerateBuilder { }

describe("NextAccelerateBuilder", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should set basePath as process.cwd()", () => {
        const builder = new TestBuilder("users"); // when 
        expect(builder["basePath"]).toBe(process.cwd()); // then
    });

    it("should pluralize resource correctly", () => {
        const builder = new TestBuilder("user"); // when  
        expect(builder["resource"]).toBe("users"); // then
    });

    it("should create correct singular name", () => {
        const builder = new TestBuilder("users"); // when 
        expect(builder["singular"]).toBe("user"); // then
    });

    it("should NOT call gitCommit when git option is false", () => {
        const builder = new TestBuilder("user", { git: false }); // given 
        (builder as any).createCommit("test commit"); // when 
        expect(gitCommit).not.toHaveBeenCalled(); // then
    });

    it("should call gitCommit when git option is true", () => {
        const builder = new TestBuilder("user", { git: true });  // given 
        (builder as any).createCommit("test commit"); // when  
        expect(gitCommit).toHaveBeenCalledWith("test commit"); // then
    });

    it("build() should log success only when git enabled", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => { }); // given 

        // when  
        const builder = new TestBuilder("user", { git: true });
        builder.build();

        expect(spy).toHaveBeenCalledWith("commits made successfully ✨"); // then
        spy.mockRestore();
    });

    it("build() should not log when git disabled", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => { }); // given 

        // when  
        const builder = new TestBuilder("user", { git: false });
        builder.build();

        expect(spy).not.toHaveBeenCalled();// then
        spy.mockRestore();
    });

});
