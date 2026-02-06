import { readFileSync } from "fs";
import { resolve } from "path";

describe("CLI entrypoint (index.ts)", () => {
  it("should start with a node shebang", () => {
    const content = readFileSync(resolve(process.cwd(), "src/index.ts"), "utf-8");
    const firstLine = content.split("\n")[0];
    expect(firstLine).toBe("#!/usr/bin/env node");
  });
});
