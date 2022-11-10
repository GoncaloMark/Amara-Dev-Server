#!/usr/bin/env node

const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();
console.log(figlet.textSync("Amara Server"));

program
    .version("1.0.0")
    .description("A cli tool for the Amara Dev Server")
    .option("-run:[PORT]", "Run server on specified Port(OPTIONAL)! (Default 5000)")
    .option("rs", "Manual Reload")
    .parse(process.argv);

const options = program.opts();