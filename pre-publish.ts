import * as path from "path";
import * as fs from "fs";

const root = path.join(__dirname);
// const root = path.join(__dirname, "packages");
console.log(root);

const PK_NAME = "package.json";
const PACKAGES_FOLDER = "packages";
const ROOT_PK = fs.readFileSync(path.join(root, PK_NAME)).toString();
// console.log(ROOT_PK);
const updateVersionOrThrow = (pk: unknown) => {};
