const spawn = require('child_process').spawn;
const chokidar = require('chokidar');
const path = require('path');
const chalk = require('chalk');

export class AmaraServers
{
    private cwd: string;
    private WatchPath: string[];
    private ignore: string;
    private Server: any;
    private file: string;

    constructor()
    {
        //Properties

        this.cwd = process.cwd();
        this.WatchPath = [
            path.join(this.cwd, "/**/*.ts")
        ];
        this.ignore = "**/node_modules/*";
        this.file = process.argv[2]; //Got to test if it's 1 or 2 here!

        //Call property functions

        this.reload();
        this.watchFiles();
        this.eventListener();
    }

    private watchFiles()
        {
            chokidar.watch(this.WatchPath, {
                ignored: this.ignore,
                ignoreInitial: true
            }).on("all", (path:any) => this.reload);

        }

    private eventListener()
    {
        process.stdin.on('data', (input:any) => {
            const parseInput:string = input.toString();

            if(parseInput === "r") this.reload();
        })
    }

    private reload()
        {
            if(this.Server) this.Server.kill("SIGTERM");

            //Gotta test this here
            this.Server = spawn("npx ts-node", this.file, {stdio: [process.stdin, process.stdout, process.stderr]}); //Run TS compilation as the amara server is a typescript project (not sure about precompilation!)
            
            console.log("RELOADED")
        }

}



