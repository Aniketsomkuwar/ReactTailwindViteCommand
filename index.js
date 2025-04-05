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
            console.log(`🚀 Creating Vite project with React + Tailwind...
    
`);
            console.log("");

            await execa(
                "npm",
                ["create", "vite@latest", projectName, "--", "--template", "react"],
                { stdio: "inherit" }
            );

            const projectDir = path.join(process.cwd(), projectName);
            process.chdir(projectDir);

            console.log("📦 Installing Tailwind CSS... 🟥 🟧 🟨 🟩 🟦 🟪");
            console.log("");
            await execa("npm", ["install", "tailwindcss", "@tailwindcss/vite"], {
                stdio: "inherit",
            });

            // Paths
            const paths = {
                indexCss: path.join(projectDir, "src", "index.css"),
                viteConfig: path.join(projectDir, "vite.config.js"),
                html: path.join(projectDir, "index.html"),
                readme: path.join(projectDir, "README.md"),
                app: path.join(projectDir, "src", "App.jsx"),
                appCss: path.join(projectDir, "src", "App.css"),
                viteSvg: path.join(projectDir, "public", "vite.svg"),
                reactSvg: path.join(projectDir, "src", "assets", "react.svg"),
            };

            // Delete unwanted files
            console.log("🧹 Cleaning up default assets...");
            console.log("");
            await Promise.allSettled([
                fs.unlink(paths.reactSvg),
                fs.unlink(paths.viteSvg),
                fs.unlink(paths.appCss),
            ]);

            // Update files
            console.log("📝 Updating README.md...");
            console.log("");
            await fs.writeFile(paths.readme, "");

            console.log("🔧 Updating vite.config.js...");
            console.log("");
            await fs.writeFile(
                paths.viteConfig,
                `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
    plugins: [react(), tailwindcss()],
})
`
            );

            console.log("🎨 Updating src/index.css...");
            console.log("");
            await fs.writeFile(
                paths.indexCss,
                `@import "tailwindcss";`
            );

            console.log("🧾 Updating index.html...");
            console.log("");
            await fs.writeFile(
                paths.html,
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

            console.log("⚛️ Updating App.jsx...");
            console.log("");
            await fs.writeFile(
                paths.app,
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

            console.log("📥 Running npm install...");
            console.log("");
            await execa("npm", ["install"], { stdio: "inherit" });

            console.log(`✅ Setup complete!

                👉 Next steps:
                  cd ${projectName}
                  npm run dev `);


            console.log("");

            console.log(`Author                      
-------------------------------------------------------------------

🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
⬜️⬜️⬜️⬜️🟨⬜️🟨🟨⬜️🟨⬜️⬜️⬜️🟨⬜️🟨🟨⬜️🟨⬜️⬜️⬜️⬜️🟨⬜️⬜️⬜️
⬜️🟨🟨⬜️🟨⬜️🟨🟨⬜️🟨🟨⬜️🟨🟨⬜️🟨⬜️🟨🟨⬜️🟨🟨🟨🟨🟨⬜️🟨
⬜️🟨🟨⬜️🟨⬜️⬜️🟨⬜️🟨🟨⬜️🟨🟨⬜️⬜️🟨🟨🟨⬜️🟨🟨🟨🟨🟨⬜️🟨
⬜️⬜️⬜️⬜️🟨⬜️🟨⬜️⬜️🟨🟨⬜️🟨🟨⬜️🟨🟨🟨🟨⬜️⬜️⬜️⬜️🟨🟨⬜️🟨
⬜️🟨🟨⬜️🟨⬜️🟨🟨⬜️🟨🟨⬜️🟨🟨⬜️⬜️🟨🟨🟨⬜️🟨🟨🟨🟨🟨⬜️🟨
⬜️🟨🟨⬜️🟨⬜️🟨🟨⬜️🟨🟨⬜️🟨🟨⬜️🟨⬜️🟨🟨⬜️🟨🟨🟨🟨🟨⬜️🟨
⬜️🟨🟨⬜️🟨⬜️🟨🟨⬜️🟨⬜️⬜️⬜️🟨⬜️🟨🟨⬜️🟨⬜️⬜️⬜️⬜️🟨🟨⬜️🟨
🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨`)







        } catch (error) {
            console.error("❌ An error occurred:", error.message || error);
        }
    });

program.parse(process.argv);
