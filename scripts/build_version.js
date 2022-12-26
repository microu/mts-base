import fs, { cp } from "node:fs";
import { LogLevel } from "typedoc";

const VERSION_LINE_RE = new RegExp('^ *export +const +VERSION *= *"([^"]*)"');

function packageVersion() {
  const json = fs.readFileSync("package.json");
  const data = JSON.parse(json);
  return data.version;
}

function findVersionLine(fileName) {
  const content = fs.readFileSync(fileName, "utf-8");
  const lines = content.split(/\r?\n/);
  let n = 0;
  for (let n = 0; n < lines.length; n += 1) {
    const line = lines[n];
    if (line.match(VERSION_LINE_RE)) {
      return [line, n];
    }
  }
  return [null, -1];
}

function updateVersionLine(fileName, lineIndex, newVersionLine) {
  const content = fs.readFileSync(fileName, "utf-8");
  const lines = content.split(/\r?\n/);
  if (lineIndex >= 0) {
    lines[lineIndex] = newVersionLine;
  } else {
    lines.push(newVersionLine);
  }

  fs.writeFileSync(fileName, lines.join("\n"), { encoding: "utf-8" });
}

const pkgVersion = packageVersion();
console.log("PKG VERSION:", pkgVersion);
const newVersionLine = `export const VERSION = "${pkgVersion}"`;
console.log("NEW LINE", newVersionLine);

const versionFilePath = "src/main/version.ts";
const [line, lineIndex] = findVersionLine(versionFilePath);
console.log("VERSION LINE", lineIndex, line);

if (lineIndex >= 0) {
  if (line != newVersionLine) {
    console.log("Updating version line.");
    console.log(`<<< ${line}`);
    console.log(`>>> ${newVersionLine}`);
    updateVersionLine(versionFilePath, lineIndex, newVersionLine);
  } else {
    console.log(`Version line already up to date:`, line);
  }
} else {
  console.log("Appending version line:", newVersionLine);
  updateVersionLine(versionFilePath, -1, newVersionLine);
}
