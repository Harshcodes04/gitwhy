#!/usr/bin/env node

const { execSync } = require("child_process");

const file = process.argv[2];

const lineFlagIndex = process.argv.indexOf("--line");

const lineNumber = lineFlagIndex !== -1 ? process.argv[lineFlagIndex + 1] : 1;

const blameOutput = execSync(
  `git blame -L ${lineNumber},${lineNumber} ${file}`,
).toString();

const firstLine = blameOutput.split("\n")[0];

const commitHash = firstLine.split(" ")[0];

if (commitHash === "00000000") {
  console.log("File has uncommitted changes.");
  process.exit();
}

const commitMessage = execSync(
  `git show -s --format=%s ${commitHash}`,
).toString();

console.log(`
WHY THIS CODE EXISTS

Line: ${lineNumber}

Commit:
${commitMessage}
`);
