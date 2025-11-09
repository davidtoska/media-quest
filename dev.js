const esbuild = require("esbuild");
const path = require("path");
const shell = require("shelljs");

const dev = async () => {
  const EXAMPLE_DIR = path.join(__dirname, "example");
  const OUT_DIR = path.join(EXAMPLE_DIR, "dist");
  const ENGINE_DIR = path.join(__dirname, "packages", "engine");
  const BUILDER_DIR = path.join(__dirname, "packages", "builder");
  console.log(BUILDER_DIR, ENGINE_DIR);
  const exampleAppEntry = path.join(EXAMPLE_DIR, "src", "dev-app.ts");

  shell.cd(ENGINE_DIR).exec("npm run build", { silent: true, async: false });
  shell.cd(BUILDER_DIR).exec("npm run build", { silent: true, async: false });

  const context = await esbuild.context({
    entryPoints: [exampleAppEntry],
    bundle: true,
    platform: "browser",
    target: "chrome58",
    sourcemap: true,
    minify: false,
    outdir: OUT_DIR
  });

  await context.watch();

  let { host, port } = await context.serve({ servedir: EXAMPLE_DIR });
  console.log(port);
  console.log(host);
  console.log("http://localhost:8000");
};

dev();
