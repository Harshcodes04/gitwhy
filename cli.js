#!/usr/bin/env node  //shebang to make the file executable

const { execSync } = require("child_process");

const file = process.argv[2];

const blameOutput = execSync(`git blame ${file}`).toString();

const firstLine = blameOutput.split("\n")[0];

const commitHash = firstLine.split(" ")[0];

const commitMessage = execSync(
  `git show -s --format=%s ${commitHash}`,
).toString();

console.log("Commit:", commitMessage);
