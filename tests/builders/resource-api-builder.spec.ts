import * as fsUtils from "../../src/utils/fs";
import { NextResourceApiBuilder } from "../../src/builders/resource-api-builder";
import { gitCommit } from "../../src/utils/services/git.service";

jest.mock("../../src/utils/fs", () => ({
    createDir: jest.fn(),
    createFile: jest.fn(),
    pathExists: jest.fn(),
}));

// mock do git
jest.mock("../../src/utils/services/git.service", () => ({
    gitCommit: jest.fn(),
}));

describe("NextResourceApiBuilder", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(process, "cwd").mockReturnValue("/app");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create api base directory if it does not exist", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
        const builder = new NextResourceApiBuilder("post", { git: true });

        // when
        builder.setDefaultPath();

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api");
    });

    it("should not recreate api directory if already exists", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(true);
        const builder = new NextResourceApiBuilder("post", { git: true });

        // when
        builder.setDefaultPath();

        // then
        expect(fsUtils.createDir).not.toHaveBeenCalled();
    });

    it("should pluralize resource name and create resource directory", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
        const builder = new NextResourceApiBuilder("post", { git: true });

        // when
        builder.setBasePath();

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/posts");
    });

    it("should create common API routes", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
        const builder = new NextResourceApiBuilder("post", { git: true });

        // when
        builder.createCommonsApi();

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/images/[resource]/[resourceId]");
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/images/[resource]/[resourceId]/route.ts", expect.any(String));
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/delete/[resource]/[resourceId]");
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/delete/[resource]/[resourceId]/route.ts", expect.any(String));
    });

    it("should skip common routes if already initialized", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(true);
        jest.spyOn(console, "log").mockImplementation(() => { });
        const builder = new NextResourceApiBuilder("post", { git: true });

        // when
        builder.createCommonsApi();

        // then
        expect(fsUtils.createDir).not.toHaveBeenCalled();
        expect(fsUtils.createFile).not.toHaveBeenCalled();
    });

    it("should create default users API routes", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
        const builder = new NextResourceApiBuilder("user", { git: true });

        // when
        builder.createDefaultUsersApi();

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/users");

        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/users/route.ts", expect.any(String));
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/users/photo");
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/users/update");
    });

    it("should create CRUD routes for a resource", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
        const builder = new NextResourceApiBuilder("product", { git: true });

        // when
        builder.createResourceCrudApi();

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/products");
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/products/route.ts", expect.any(String));
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/products/[productId]");
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/products/[productId]/route.ts", expect.any(String));
    });

    it("should not register commits when git is false", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
        const builder = new NextResourceApiBuilder("post", { git: false });

        // when
        builder.createResourceCrudApi();

        // then
        expect(gitCommit).not.toHaveBeenCalled();
    });

});
