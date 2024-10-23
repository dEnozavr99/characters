#!/bin/node

const fs = require("fs");

const targetEnvironment = process.env[2];
const envFileContent = require(`../../environments/.env.${targetEnvironment}`);

fs.writeFileSync(".env", envFileContent);
