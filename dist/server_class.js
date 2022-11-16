"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jalapeno = void 0;
const spawn_process = __importStar(require("child_process"));
const chokidar = __importStar(require("chokidar"));
const path = __importStar(require("path"));
const readline = __importStar(require("node:readline"));
const spawn = spawn_process.spawn; //Fork?
class Jalapeno {
    constructor() {
        //Properties
        this.cwd = process.cwd();
        this.WatchPath = [
            path.join(this.cwd, "/**/*.ts")
        ];
        this.ignore = "**/node_modules/*";
        this.file = process.argv[3]; //Got to test if it's 1 or 2 here!
        //Call property functions
        console.log('\x1b[34m%s\x1b[0m', `Watching Directory ${this.cwd}, will reload ${this.file} file on changes detected!`);
        this.reload();
        this.watchFiles();
        this.eventListener();
    }
    watchFiles() {
        chokidar.watch(this.WatchPath, {
            ignored: this.ignore,
            ignoreInitial: true
        }).on("all", (path) => { console.log('\x1b[33m%s\x1b[0m', 'Changes Detected!'); this.reload(); });
    }
    eventListener() {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.on('SIGINT', () => {
            console.log('\x1b[31m%s\x1b[0m', "Caught interrupt signal");
            process.exit();
        });
        rl.on('line', (data) => {
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
        this.Server = spawn("node", ["-r", "ts-node/register", this.file], { stdio: [process.stdin, process.stdout, process.stderr] }); //Run TS compilation as the amara server is a typescript project (not sure about precompilation!)
        if (this.Server)
            console.log('\x1b[33m%s\x1b[0m', 'Reloaded!');
    }
}
exports.Jalapeno = Jalapeno;
