#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// cli/server_class.ts
var spawn_process = __toESM(require("child_process"));
var chokidar = __toESM(require("chokidar"));
var path = __toESM(require("path"));
var readline = __toESM(require("readline"));
var spawn2 = spawn_process.spawn;
var Jalapeno = class {
  constructor() {
    this.cwd = process.cwd();
    this.WatchPath = [
      path.join(this.cwd, "/**/*.ts")
    ];
    this.ignore = "**/node_modules/*";
    this.file = typeof process.argv[3] === "string" ? process.argv[3] : this.Server.kill("SIGTERM");
    ;
    console.log("\x1B[34m%s\x1B[0m", `Watching Directory ${this.cwd}, will reload ${this.file} file on changes detected!`);
    this.reload();
    this.watchFiles();
    this.eventListener();
  }
  watchFiles() {
    chokidar.watch(this.WatchPath, {
      ignored: this.ignore,
      ignoreInitial: true
    }).on("all", (path2) => {
      console.log("\x1B[33m%s\x1B[0m", "Changes Detected!");
      this.reload();
    });
  }
  eventListener() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.on("SIGINT", () => {
      console.log("\x1B[31m%s\x1B[0m", "Caught interrupt signal");
      process.exit();
    });
    rl.on("line", (data) => {
      const chunk = data;
      if (chunk === null)
        return;
      if (chunk == "r")
        this.reload();
    });
  }
  reload() {
    if (this.Server)
      this.Server.kill("SIGTERM");
    this.Server = spawn2("node", ["-r", "ts-node/register", this.file], { stdio: [process.stdin, process.stdout, process.stderr] });
    if (this.Server)
      console.log("\x1B[33m%s\x1B[0m", "Reloaded!");
  }
};

// cli/index.ts
var { Command } = require("commander");
var figlet = require("figlet");
var program = new Command();
console.log(figlet.textSync("Jalapeno"));
console.log("-h for Help!");
program.version("1.0.0").description("Jalapeno File Watcher For Typescript! Run: jalapeno --run (filename) Close: CTRL + C").option("--run", "Start Watching Typescript files!").parse(process.argv);
var options = program.opts();
if (options.run) {
  new Jalapeno();
}
