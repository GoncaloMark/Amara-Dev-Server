#!/usr/bin/env node

import { AmaraServers } from "./server_class";

const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();
console.log(figlet.textSync("Amara Server"));

program
    .version("1.0.0")
    .description("A cli tool for the Amara Dev Server")
    .option("--run", "Run server on port 5000")
    .parse(process.argv);

const options = program.opts();

if(options.run){
    console.log("Started")
    const amara: AmaraServers = new AmaraServers()
}