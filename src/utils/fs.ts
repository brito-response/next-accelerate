import fs from "fs";

export const createDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  };
};

export const createFile = (filePath: string, content: string) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content.trimStart());
  }
};

export function pathExists(p: string) {
  return fs.existsSync(p);
};
