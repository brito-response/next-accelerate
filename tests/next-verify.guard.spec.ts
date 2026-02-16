import fs from "fs";
import { nextProjectGuardSimple } from "../src/utils/guards/index";

jest.mock("fs");

describe("nextProjectGuardSimple", () => {

  it("should terminate if there is no package.json file.", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false); // when
    expect(() => nextProjectGuardSimple()).toThrow("process.exit: 1"); // then
  });

  it("should terminate if package.json exists but is not a Next.js project", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true); // given 

    (fs.readFileSync as jest.Mock).mockReturnValue(   // when
      JSON.stringify({
        dependencies: {
          react: "^18.2.0",
        },
      })
    );
    expect(() => nextProjectGuardSimple()).toThrow("process.exit: 1"); // then
  });

  it("should not terminate when it is a Next.js project", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({
      dependencies: {
        next: "14.1.0",
      },
    })
    );

    expect(() => nextProjectGuardSimple()).not.toThrow();
  });

});
