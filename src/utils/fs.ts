import fs from "node:fs";
import path from "node:path";

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

export const moveFile = (fromPath: string, toPath: string) => {
  if (fs.existsSync(fromPath)) {
    const toDir = path.dirname(toPath);

    if (!fs.existsSync(toDir)) {
      fs.mkdirSync(toDir, { recursive: true });
    }

    fs.renameSync(fromPath, toPath);
  }
};
