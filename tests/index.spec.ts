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
      'case "create:form":',
      'case "config:next-auth":',
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
      'console.log("commands available in the cli:");',
      'console.log("  create <resource-name> - creates all folders for a new resource.");',
      'console.log("  create:form <resource-name> - creates a new form for the resource");',
      'console.log("  config:next-auth - creates a new form for the resource");',
    ];

    const lines = helpBlock.split("\n").map((l) => l.trim()).filter(Boolean); // when
    expect(lines).toEqual(expectedLogs);// then
  });

});
