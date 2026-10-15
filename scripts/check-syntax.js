import { readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const sourceFiles = [];

const collectJavaScript = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collectJavaScript(path);
    else if (entry.name.endsWith(".js")) sourceFiles.push(path);
  }
};

collectJavaScript("carpooling-app");
sourceFiles.push("server.js");

for (const file of sourceFiles) {
  const result = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log(`Syntax check passed for ${sourceFiles.length} files.`);
