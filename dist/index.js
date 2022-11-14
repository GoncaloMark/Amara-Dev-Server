#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_class_1 = require("./server_class");
const { Command } = require("commander");
const figlet = require("figlet");
const program = new Command();
console.log(figlet.textSync("Amara Server"));
console.log("-h for help!");
program
    .version("1.0.0")
    .description('AMS File Watcher! Run: ams --run (filename) Close: CTRL + C')
    .option("--run", "Start Watching files!")
    .parse(process.argv);
const options = program.opts();
if (options.run) {
    new server_class_1.AmaraServers();
}
