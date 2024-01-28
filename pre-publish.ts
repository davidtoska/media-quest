import * as path from "path";
import * as fs from "fs";

// const root = path.join(__dirname, "packages");

// const p = {
//   root: path.join(__dirname, "packages.json"),
//   engine: path.join(__dirname, "packages.json"),
//
// }
const pk = fs.readFileSync(path.join(__dirname, "package.json")).toString();
const enginePK = fs
  .readFileSync(path.join(__dirname, "packages", "engine", "package.json"))
  .toString();
const builderPK = fs
  .readFileSync(path.join(__dirname, "packages", "builder", "package.json"))
  .toString();

const parseVersion = (path: string) => {
  return JSON.parse(pk).version;
};
// const currentVersion = (): number => {
//
// }
console.log(pk);
// console.log(ROOT_PK);
const updateVersionOrThrow = (pk: unknown) => {
  if (typeof pk !== "string") {
    throw new Error("Invalid package.json format");
  }

  return JSON.parse(pk).version;
};
