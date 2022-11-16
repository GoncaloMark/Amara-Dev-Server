#!/usr/bin/env node
import { Jalapeno } from "./server_class";

const { Command } = require("commander");
const figlet = require("figlet");

const program = new Command();
console.log(figlet.textSync("Jalapeno"));
console.log("-h for Help!");

program
    .version("1.0.0")
    .description('Jalapeno File Watcher For Typescript! Run: jalapeno --run (filename) Close: CTRL + C')
    .option("--run", "Start Watching Typescript files!")
    .parse(process.argv);

const options = program.opts();

if(options.run){
    new Jalapeno();
}