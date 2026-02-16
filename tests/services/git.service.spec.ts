import { gitCommit } from "../../src/utils/services/git.service";
import { execSync } from "node:child_process";

jest.mock("node:child_process", () => ({ execSync: jest.fn() }));

describe("gitCommit", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should run git add and git commit with correct message", () => {
    gitCommit("feat(user): create resource"); // when

    // then
    expect(execSync).toHaveBeenNthCalledWith(1, "git add .", { stdio: "ignore" });
    expect(execSync).toHaveBeenNthCalledWith(2, 'git commit -m "feat(user): create resource"', { stdio: "ignore" });
  });

  it("should do nothing if message is empty", () => {
    gitCommit(""); // when
    gitCommit(undefined as unknown as string);

    expect(execSync).not.toHaveBeenCalled(); // then
  });

  it("should escape special characters in message", () => {
    gitCommit('feat("user"): $commit'); // when
    expect(execSync).toHaveBeenNthCalledWith(2, 'git commit -m "feat(\\"user\\"): \\$commit"', { stdio: "ignore" }); // then
  });

  it("should log error if execSync throws", () => {
    (execSync as jest.Mock).mockImplementationOnce(() => { throw new Error("fail"); });
    gitCommit("feat(user): test"); // when
    expect(console.error).toHaveBeenCalledWith("Failed to commit changes:", expect.any(Error)); // then
  });

});
