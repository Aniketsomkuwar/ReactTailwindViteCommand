#!/usr/bin/env node
const { program } = require("commander");
const { execa } = require("execa");
const fs = require("fs").promises;
const path = require("path");

program
    .version("1.0.0")
    .argument("<projectName>", "The name of the project to create")
    .action(async (projectName) => {
        try {
            console.log(`Creating Vite project with React + Tailwind template...`);
            await execa("npm", ["create", "vite@latest", projectName, "--", "--template", "react"], { stdio: "inherit" });

            const projectDir = path.join(process.cwd(), projectName);
            process.chdir(projectDir);

            console.log("Installing Tailwind CSS");
            await execa("npm", ["install", "tailwindcss", "@tailwindcss/vite"]);

            const indexCssPath = path.join(projectDir, "src", "index.css");

            const viteConfigPath = path.join(projectDir, "vite.config.js");

            const htmlPath = path.join(projectDir, "index.html");

            const readmePath = path.join(projectDir, "README.md");

            const appPath = path.join(projectDir, "src", "App.jsx");

            const appCssPath = path.join(projectDir, "src", "App.css");

            const viteSvgPath = path.join(projectDir, "public", "vite.svg");

            const reactSvgPath = path.join(projectDir, "src", "assets", "react.svg");

            console.log("Deleting extra svg's");
            await fs.unlink(reactSvgPath);
            await fs.unlink(viteSvgPath);

            console.log("Deleting extra files");
            await fs.unlink(appCssPath);


            console.log("Updating Readme...");
            await fs.writeFile(
                readmePath,
                ``
            );

            console.log("Updating vite.config.js...");
            await fs.writeFile(
                viteConfigPath,
                `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
    plugins: [react(), tailwindcss()],
})`
            );

            console.log("Updating src/index.css...");
            await fs.writeFile(indexCssPath, `@import "tailwindcss";`);

            console.log("Updating index.html");
            await fs.writeFile(
                htmlPath,
                `<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>`
            );

            console.log("Updating app.jsx");
            await fs.writeFile(
                appPath,
                `import React from 'react';
                const App = () => {
                
                
                  return (
                    <>
                      <h1 className="font-bold text-blue-500">Vite + React + Tailwind</h1>
                    </>
                  )
                }
                
                export default App`
            );

            console.log("Running npm install...");
            await execa("npm", ["install"], { stdio: "inherit" });

            console.log(`✅ Setup complete! Run the following:
cd ${projectName}
npm run dev`);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

program.parse(process.argv);
