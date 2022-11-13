#!/usr/bin/env node

import { addSyntheticLeadingComment } from "typescript";
import { AmaraServers } from "./server_class";

const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();
console.log(figlet.textSync("Amara Server"));

program
    .version("1.0.0")
    .description("A cli tool for the Amara Dev Server")
    .option("--run", "Start Watching files!")
    .parse(process.argv);

const options = program.opts();

if(options.run){
    console.log("Started")
    new AmaraServers()
}
