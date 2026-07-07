const { spawn } = require("child_process");
const path = require("path");

const projectPath = path.join(__dirname, "site");
const domain = "eafc26-player-analytics-api-docs-vidhi.surge.sh";
const email = "eafc26-docs-vidhi-mandaliya@mailinator.com";
const password = "eafc26-docs-secure-pwd-2026";

console.log(`Starting deployment of folder: ${projectPath}`);
console.log(`Target Domain: ${domain}\n`);

// Run surge via npx
// We pass --project and --domain to skip those prompts
const child = spawn("npx", ["surge", "--project", projectPath, "--domain", domain], {
  shell: true,
  cwd: path.join(__dirname, "..")
});

let isDone = false;

child.stdout.on("data", (data) => {
  const output = data.toString();
  process.stdout.write(output);

  // Check if it's prompting for email
  if (output.toLowerCase().includes("email:")) {
    console.log(`\n[Deploy Script] Sending registration email: ${email}`);
    child.stdin.write(email + "\n");
  }

  // Check if it's prompting for password
  if (output.toLowerCase().includes("password:")) {
    console.log(`\n[Deploy Script] Sending registration password: ********`);
    child.stdin.write(password + "\n");
  }

  // Check for successful deployment
  if (output.includes("Success! Projected")) {
    isDone = true;
    console.log(`\n[Deploy Script] DEPLOYMENT SUCCESSFUL!`);
    console.log(`Your documentation is live at: https://${domain}\n`);
  }
});

child.stderr.on("data", (data) => {
  const errOutput = data.toString();
  process.stderr.write(errOutput);
});

child.on("close", (code) => {
  if (code === 0 || isDone) {
    console.log(`Deployment process finished successfully.`);
  } else {
    console.error(`Deployment process exited with error code ${code}`);
  }
});
