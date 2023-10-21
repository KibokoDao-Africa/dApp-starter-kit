#!/usr/bin/env node

const { execSync } = require('child_process');

const runCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`failed to execute command: ${command}`);
    return false;
  }

  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/KibokoDao-Africa/dApp-starter-kit ${repoName}`;
const installDependenciesCommand = `
  cd ${repoName} && 
  cd hardhat && npm install && 
  cd ../frontend && npm install
`;

console.log(`Cloning Kiboko dapp starter kit into ${repoName}...`);

const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) {
  process.exit(-1);
}

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDependenciesCommand);
if(!installedDeps) {
  process.exit(-1);
}

console.log(
  `Congratulations! You are ready to build dapps the Kiboko way! 🦛 💻. Follow the following command to get started`
);

console.log(`cd ${repoName} && cd frontend && npm run dev`); 