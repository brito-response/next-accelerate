import * as fsUtils from "../../src/utils/fs";
import { NextAuthBuilder } from "../../src/builders/next-auth-builder";

jest.mock("../../src/utils/fs", () => ({
  installDependencesRequired: jest.fn(),
  createDir: jest.fn(),
  createFile: jest.fn(),
  pathExists: jest.fn(),
  moveFile: jest.fn(),
}));

jest.mock("../../src/utils/services/git.service", () => ({ gitCommit: jest.fn() }));
jest.mock("../../src/utils/services/install-nextauth-motion.service", () => ({
  DependencyFramemotionAndNextAuthInstaller: { getInstance: () => ({ install: jest.fn(), }), },
}));


describe("NextAuthBuilder", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, "cwd").mockReturnValue("/app");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be chainable", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(true);
    (fsUtils.createDir as jest.Mock).mockImplementation(() => { });

    const builder = new NextAuthBuilder({ git: true }); // when

    // then
    expect(builder.setBasePathAndCreateConfig()).toBe(builder);
    expect(builder.createNextAuthAuxOptions()).toBe(builder);
    expect(builder.createNextAuthForms()).toBe(builder);
  });

  it("should exit cli if directory creation fails", () => {
    // given
    jest.spyOn(console, "error").mockImplementation(() => { });
    jest.spyOn(process, "exit").mockImplementation((code?: string | number | null | undefined) => { throw new Error(`process.exit: ${code}`); });
    (fsUtils.createDir as jest.Mock).mockImplementation(() => { });
    (fsUtils.pathExists as jest.Mock).mockReturnValue(false);

    const builder = new NextAuthBuilder({ git: true }); // when

    // then
    expect(() => builder.setBasePathAndCreateConfig()).toThrow("process.exit: 1");
    expect(fsUtils.createDir).toHaveBeenCalled();
  });

  it("should create next-auth config route", () => {
    (fsUtils.pathExists as jest.Mock).mockReturnValue(true);

    const builder = new NextAuthBuilder({ git: true });
    builder.setBasePathAndCreateConfig();

    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/api/auth/[...nextauth]");
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/auth/[...nextauth]/route.ts", expect.any(String));
  });

  it("should create aux options and utils files", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(true);
    const builder = new NextAuthBuilder({ git: true });

    builder.createNextAuthAuxOptions(); // when

    // then
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/auth/decode-claims.ts", expect.any(String));
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/api/auth/request-api.ts", expect.any(String));
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/utils");
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/utils/route.ts", expect.any(String));
  });

  it("should create next-auth user forms", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
    const builder = new NextAuthBuilder({ git: true });

    builder.createNextAuthForms(); // when

    // then
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/forms");
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/forms/users");
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/forms/users/FormLogin");
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/forms/users/FormForgot");
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/forms/users/FormLogin/index.tsx", expect.any(String));
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/forms/users/index.ts", expect.stringContaining('export { FormLogin } from "./FormLogin"'));
  });

  it("should not register commits when git is false", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
    const builder = new NextAuthBuilder({ git: false });
    (builder as any).commitQueue = [];

    builder.createNextAuthForms(); // when 

    expect((builder as any).commitQueue).toHaveLength(0); // then
  });

  it("should create proxy authorization system", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(true);
    const builder = new NextAuthBuilder({ git: true });

    builder.createNextAutorizationSystem(); // when

    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/proxy.ts", expect.any(String)); // then
  });

  it("should create default layouts structure", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
    const builder = new NextAuthBuilder({ git: true });

    builder.createNextLayouts(); // when

    // then
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/components/Layouts");
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/components/Layouts/LayoutCaptureError/index.tsx", expect.any(String));
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/components/Layouts/ManagerLayout/grid.module.css", expect.any(String));
  });

  it("should restructure app router into publics and privates", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
    const builder = new NextAuthBuilder({ git: true });

    builder.setLayouts(); // when

    // then
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/(publics)");
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/(privates)");
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/app/(privates)/manager");
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/(privates)/layout.tsx", expect.any(String));
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/app/(privates)/manager/page.tsx", expect.any(String));
  });

  it("should create context and core components", () => {
    // given
    (fsUtils.pathExists as jest.Mock).mockReturnValue(false);
    const builder = new NextAuthBuilder({ git: true });

    builder.createComponentsAux(); // when

    // then
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/contexts");
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/contexts/manager-context.tsx", expect.any(String));
    expect(fsUtils.createDir).toHaveBeenCalledWith("/app/src/components/Header");
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/src/components/Header/index.tsx", expect.any(String));
  });

  it("should create .env.local file with environment template", () => {
    // given
    const builder = new NextAuthBuilder({ git: true });

    // when
    const result = builder.setEnvironmentVariable();

    // then
    expect(fsUtils.createFile).toHaveBeenCalledWith("/app/.env.local", expect.any(String));
    expect(result).toBe(builder);
  });

  it("should create .env.local file with correct environment variables", () => {
    const builder = new NextAuthBuilder({ git: true }); // given
    builder.setEnvironmentVariable(); // when

    // then
    expect(fsUtils.createFile).toHaveBeenCalledTimes(1);
    const [filePath, fileContent] = (fsUtils.createFile as jest.Mock).mock.calls[0];
    expect(filePath).toBe("/app/.env.local");
    expect(typeof fileContent).toBe("string");
    expect(fileContent).toContain("NEXTAUTH_SECRET");
    expect(fileContent).toContain("NEXTAUTH_URL");
  });


});
