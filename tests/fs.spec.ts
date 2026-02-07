jest.mock("fs", () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

import fs from "fs";
import { createDir, createFile, pathExists } from "../src/utils/fs";

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("utils/fs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should export all functions.", () => {
    // then
    expect(createDir).toBeDefined();
    expect(createFile).toBeDefined();
    expect(pathExists).toBeDefined();

    expect(typeof createDir).toBe("function");
    expect(typeof createFile).toBe("function");
    expect(typeof pathExists).toBe("function");
  });

  it("createDir should create directory if it doesn't exist", () => {
    mockedFs.existsSync.mockReturnValue(false); // given
    createDir("src/components"); // when
    expect(mockedFs.mkdirSync).toHaveBeenCalledWith("src/components",{ recursive: true }); // then
  });

  it("createDir should NOT create directory if it already exists", () => {
    mockedFs.existsSync.mockReturnValue(true); // given
    createDir("src/components"); // when
    expect(mockedFs.mkdirSync).not.toHaveBeenCalled(); // then
  });

  it("createFile should create file if it doesn't exist", () => {
    mockedFs.existsSync.mockReturnValue(false); // given
    createFile("test.txt", "   conteúdo"); // when
    expect(mockedFs.writeFileSync).toHaveBeenCalledWith("test.txt","conteúdo"); // then
  });

  it("createFile should NOT create file if it already exists", () => {
    mockedFs.existsSync.mockReturnValue(true); // given
    createFile("test.txt", "conteúdo"); // when
    expect(mockedFs.writeFileSync).not.toHaveBeenCalled(); // then
  });

  it("pathExists should return true when path exists", () => {
    mockedFs.existsSync.mockReturnValue(true); // given 
    const result = pathExists("algo"); // when
    expect(result).toBe(true); // then
  });

  it("pathExists should return false when path doesn't exist", () => {
    mockedFs.existsSync.mockReturnValue(false); // given 
    const result = pathExists("algo"); // when path doesn't exist
    expect(result).toBe(false); //then
  });
});
