import express from "express";
import dotenv from "dotenv";
import esbuild from "esbuild";
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

function updateHtml(bundlePath, htmlTemplatePath, outputHtmlPath) {
  const scriptTag = `<script src="${bundlePath}"></script>`;
  let htmlContent = fs.readFileSync(htmlTemplatePath, "utf8");
  htmlContent = htmlContent.replace("</body>", `${scriptTag}</body>`);
  fs.writeFileSync(outputHtmlPath, htmlContent);
}

function build(isProduction = false) {
  const outDir = isProduction ? "dist" : "public";
  esbuild
    .build({
      entryPoints: ["src/index.jsx"],
      bundle: true,
      outfile: `${outDir}/bundle.js`,
      minify: isProduction,
      sourcemap: !isProduction,
      define: {
        "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
      },
    })
    .then(() => {
      updateHtml("bundle.js", "src/index.html", `${outDir}/index.html`);
    })
    .catch(() => process.exit(1));
}

if (process.env.NODE_ENV === "development") {
  build();
  app.use(express.static("public"));
  app.listen(port, () =>
    console.log(`Development server running at http://localhost:${port}`)
  );

  chokidar.watch("src/**/*").on("change", () => {
    console.log("Files changed, rebuilding...");
    build();
  });
} else {
  build(true);
}
