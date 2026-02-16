import * as fsUtils from "../../src/utils/fs";
import * as gitUtils from "../../src/utils/services/git.service";
import { NextResourceBuilder } from "../../src/builders/resource-builder";

jest.mock("../../src/utils/services/install-dependences.service", () => ({
    DependencyInstaller: {
        getInstance: jest.fn().mockReturnValue({
            install: jest.fn().mockResolvedValue(undefined),
        }),
    },
}));

jest.mock("../../src/utils/fs", () => ({ createDir: jest.fn(), createFile: jest.fn(), pathExists: jest.fn() }));
jest.mock("../../src/utils/services/git.service", () => ({ gitCommit: jest.fn() }));

describe("NextResourceBuilder", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(process, "cwd").mockReturnValue("/app");
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should be chainable", () => {
        const builder = new NextResourceBuilder("user"); // given
        const result = builder.setBasePath(); // when
        expect(result).toBe(builder);  // then
    });

    it("should create base resource directory", () => {
        const builder = new NextResourceBuilder("user");  // given
        builder.setBasePath();  // when
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/(privates)/users"); // then
    });

    it("should create forms base directory", () => {
        const builder = new NextResourceBuilder("user");// given
        builder.setBasePathForForm(); // when
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/forms"); // then
    });

    it("should create list page", () => {
        const builder = new NextResourceBuilder("user");  // given
        builder.setBasePath().createListPage(); // when
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/(privates)/users/page.tsx", expect.any(String)); // then
    });

    it("should create detail page structure ", () => {
        const builder = new NextResourceBuilder("user", { git: true }); // given

        builder.setBasePath().createDetailPage(); // when

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/(privates)/users/[userId]");
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/(privates)/users/[userId]/page.tsx", expect.any(String));
    });

    it("should not call gitCommit if git option is false", () => {
        const builder = new NextResourceBuilder("user", { git: false }); // given
        (builder as any).createCommit("feat: test"); // when
        expect(gitUtils.gitCommit).not.toHaveBeenCalled(); // then
    });

    it("should call gitCommit via createCommit if git is true", () => {
        const builder = new NextResourceBuilder("user", { git: true });  // given
        // when
        (builder as any).createCommit("feat: test commit");
        expect(gitUtils.gitCommit).toHaveBeenCalledWith("feat: test commit");  // then
    });

    it("should create new page", () => {
        const builder = new NextResourceBuilder("user"); // given
        builder.setBasePath().createNewPage();// when

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/(privates)/users/new");
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/(privates)/users/new/page.tsx", expect.any(String));
    });

    it("should create CRUD forms only if they do not exist", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
        const builder = new NextResourceBuilder("user");

        builder.setBasePathForForm().createCrudForm();  // when

        // then
        expect(fsUtils.createDir).toHaveBeenCalled();
        expect(fsUtils.createFile).toHaveBeenCalledWith(expect.stringContaining("FormDelete/index.tsx"), expect.any(String));
    });

    it("should not recreate delete form if already exists", () => {
        // given
        (fsUtils.pathExists as jest.Mock).mockReturnValue(true);
        const builder = new NextResourceBuilder("user");

        builder.setBasePathForForm().createCrudForm();// when
        expect(fsUtils.createFile).not.toHaveBeenCalledWith(expect.stringContaining("FormDelete/index.tsx"), expect.anything()); // then
    });


    it("should not create commit if git option is false", () => {
        const builder = new NextResourceBuilder("user", { git: false });// given
        (builder as any).createCommit("feat: ignored"); // when
        expect(gitUtils.gitCommit).not.toHaveBeenCalled(); // then
    });

    it("build() should do nothing when git is false", () => {
        const builder = new NextResourceBuilder("user", { git: false }); // given
        // when
        (builder as any).commitQueue = ["msg1"];
        builder.build();
        expect(gitUtils.gitCommit).not.toHaveBeenCalled(); // then
    });

    it("should create components base directory", () => {
        const builder = new NextResourceBuilder("user"); // given
        builder.setBasePathForComponents(); // when
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/components"); // then
    });

    it("should create custom input component and commit if git is true", () => {
        const builder = new NextResourceBuilder("user", { git: true }); // given
        builder.setBasePathForComponents(); // precisa setar basePath antes

        // when
        builder.createComponentInputCustom();

        // then
        expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/components/Inputs/InputCustom");
        expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/components/Inputs/InputCustom/index.tsx",expect.any(String));
    });

    it("should not call git commit if git is false when creating custom input", () => {
        const builder = new NextResourceBuilder("user", { git: false }); // given
        
        // when
        builder.setBasePathForComponents();
        builder.createComponentInputCustom();

        // then
        expect(gitUtils.gitCommit).not.toHaveBeenCalled();
    });
});

