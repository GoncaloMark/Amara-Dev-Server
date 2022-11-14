import * as spawn_process from 'child_process'
import * as chokidar from 'chokidar'
import * as path from 'path'
import * as readline from 'node:readline';

const spawn = spawn_process.spawn; //Fork?

export class AmaraServers
{
    private cwd: string;
    private WatchPath: string[];
    private ignore: string;
    private Server: any;
    private readonly file: string;

    constructor()
    {
        //Properties

        this.cwd = process.cwd();
        this.WatchPath = [
            path.join(this.cwd, "/**/*.ts")
        ];
        this.ignore = "**/node_modules/*";
        this.file = process.argv[3]; //Got to test if it's 1 or 2 here!

        //Call property functions

        console.log('\x1b[34m%s\x1b[0m', `Watching Directory ${this.cwd}, will reload ${this.file} file on changes detected!`)

        this.reload();
        this.watchFiles();
        this.eventListener();
    }

    private watchFiles()
        {
            chokidar.watch(this.WatchPath, {
                ignored: this.ignore,
                ignoreInitial: true
            }).on("all", (path:any) => {console.log('\x1b[33m%s\x1b[0m', 'Changes Detected!'); this.reload()});

        }

    private eventListener()
    {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        rl.on('line', (data) => {
            const chunk = data;

            if(chunk === null)
                return;

            if(chunk == "r")
                this.reload();
        });
    }

    private reload()
        {
            if(this.Server) this.Server.kill("SIGTERM");
            this.Server = spawn("node", ["-r", "ts-node/register", this.file], { stdio: [ process.stdin, process.stdout, process.stderr ]}); //Run TS compilation as the amara server is a typescript project (not sure about precompilation!)

            if(this.Server) console.log('\x1b[33m%s\x1b[0m', 'Reloaded!')
            
        }

}
