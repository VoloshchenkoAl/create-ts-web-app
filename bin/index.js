#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { spawnSync } = require('child_process');

const templatePackageJson = require('../template/package.json');
const packageJson = require('../package.json');

let projectName;

program
    .version(packageJson.version)
    .arguments('<project-directory>')
    .action((name) => {
        projectName = name;
    })
    .parse(process.arg);

createApp({ name: projectName });

function createApp({ name }) {
    console.log('Installing...');

    const root = path.resolve(name);
    const templateDirPath = path.resolve(__dirname, '../', 'template');
    fs.ensureDirSync(root);
    fs.copySync(templateDirPath, root);
    fs.writeFileSync(path.join(root, 'package.json'), updatePackageJson());
    install({ cwd: root });

    console.log('Done');
}

function updatePackageJson() {
    const updateTemplatePackageJson = { ...templatePackageJson };
    updateTemplatePackageJson.name = projectName;

    return JSON.stringify(updateTemplatePackageJson, null, 2);
}

function install({ cwd }) {
    spawnSync('npm', ['install'], { cwd });
}
