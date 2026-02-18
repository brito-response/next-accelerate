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
      'case "-help":',
      'default:',
    ];

    cases.forEach((c) => { // when then
      expect(content).toContain(c);
    });
  });

  it("should not contain any extra cases", () => {
    // given
    const switchBlockMatch = content.match(/switch\s*\(\s*command\s*\)\s*{([\s\S]*?)^\}/m);
    expect(switchBlockMatch).not.toBeNull();
    const switchBlock = switchBlockMatch![1];
    const foundCases = [...switchBlock.matchAll(/^\s*(case\s+"[^"]+":|default:)/gm)].map((m) => m[1] || m[0]);
    const expectedCases = [
      'case "create":',
      'case "create:components":',
      'case "create:form":',
      'case "config:next-auth":',
      'case "create:api-commons":',
      'case "create:api-resource":',
      'case "-help":',
      'default:',
    ];
    expect(foundCases).toEqual(expectedCases); // then
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
      'console.log("  \\x1b[32mcreate:form\\x1b[0m \\x1b[33mresource_name\\x1b[0m                     -> creates a new form for the resource");',
      'console.log("  \\x1b[32mconfig:next-auth\\x1b[0m                              -> creates a new form for the resource");',
      'console.log("  \\x1b[32mcreate:api-commons\\x1b[0m                            -> creates commons api resource");',
      'console.log("  \\x1b[32mcreate:api-resource\\x1b[0m \\x1b[33mresource-name\\x1b[0m             -> creates a new api resource");',
      'console.log("\\n\\n");',
    ];

    const lines = helpBlock.split("\n").map((l) => l.trim()).filter(Boolean); // when
    expect(lines).toEqual(expectedLogs);// then
  });

});
