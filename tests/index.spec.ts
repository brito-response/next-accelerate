import { readFileSync } from "fs";
import { resolve } from "path";

describe("cli entrypoint (index.ts)", () => {
  const filePath = resolve(process.cwd(), "src/index.ts");
  const content = readFileSync(filePath, "utf-8");

  it("should start with a node shebang", () => {
    const firstLine = content.split("\n")[0]; // when
    expect(firstLine).toBe("#!/usr/bin/env node"); //then 
  });

  it("should contain a switch on 'command'", () => {
    expect(content).toMatch(/switch\s*\(\s*command\s*\)/); //then
  });

  it("should contain the expected switch cases", () => {
    //given
    const cases = [
      'case "create":',
      'case "create:form":',
      'case "config:next-auth":',
      'case "create:api-commons":',
      'case "create:api-resource":',
      'case "config:tests-unit":',
      'case "config:tests-e2e":',
      'case "-help":',
      'default:',
    ];

    cases.forEach((c) => { // when then
      expect(content).toContain(c);
    });
  });

  it('case "-help" should log exactly the expected lines', () => {
    // given
    const helpCaseMatch = content.match(/case "-help":([\s\S]*?)break;/);
    expect(helpCaseMatch).not.toBeNull();
    const helpBlock = helpCaseMatch![1];
    const expectedLogs = [
      'console.log("\\n\\n\\x1b[35mcommands available in the cli: \\x1b[0m");',
      'console.log("  \\x1b[32mcreate\\x1b[0m \\x1b[33mresource_name\\x1b[0m                          -> creates all folders for a new resource.");',
      'console.log("  \\x1b[32mcreate:components\\x1b[0m                             -> create components resource.");',
      'console.log("  \\x1b[32mcreate:form\\x1b[0m \\x1b[33mresource_name\\x1b[0m                     -> creates a new form for the resource.");',
      'console.log("  \\x1b[32mconfig:next-auth\\x1b[0m                              -> create configuration for next auth.");',
      'console.log("  \\x1b[32mcreate:api-commons\\x1b[0m                            -> create common resources for using api routes.");',
      "console.log(\"  \\x1b[32mcreate:api-resource\\x1b[0m \\x1b[33mresource-name\\x1b[0m             -> creates a new api resource.\");",
      'console.log(\"  \\x1b[32mconfig:tests-unit\\x1b[0m                             -> config tests unit with vitest.\");',
      'console.log(\"  \\x1b[32mconfig:tests-e2e\\x1b[0m                              -> config tests end to end with playwright.\");',
      'console.log("\\n\\n");',
    ];

    const lines = helpBlock.split("\n").map((l) => l.trim()).filter(Boolean); // when
    expect(lines).toEqual(expectedLogs);// then
  });

});
