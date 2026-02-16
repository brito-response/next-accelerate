import { execSync } from "node:child_process";

export function gitCommit(message: string) {
  if (!message) return;
  const safeMessage = String.raw`${message.replace(/(["`$\\])/g, "\\$1")}`;

  try {
    execSync("git add .", { stdio: "ignore" });
    execSync(`git commit -m "${safeMessage}"`, { stdio: "ignore" });
  } catch (error) {
    console.error("Failed to commit changes:", error);
  }
};
