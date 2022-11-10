const spawn = require('child_process').spawn;
const chokidar = require('chokidar');
const path = require('path');
const chalk = require('chalk');
const express = require("express");
const app = express();


class AmaraServers
{

    cwd: any;
    WatchPath: any;
    ignore: string;
    nodeServer: any;

    constructor()
    {
        //Properties

        this.cwd = process.cwd();
        this.WatchPath = [
            path.join(this.cwd, "/**/*.ts")
        ];
        this.ignore = "**/node_modules/*";

        //Call property functions

        this.reload();
        this.watchFiles();
    }
    

    runServer(PORT?:number):void
        {
            if(PORT){
                app.listen(PORT, () => {
                    console.log(`Listening on ${PORT}`);
                });
            } else {
                PORT = 5000
                app.listen(PORT, () => {
                    console.log("Listen on the port 5000...");
                });
            }

            app.get('/', (req:any, res: any) => {
                res.sendFile(path.join(__dirname, '/index.html'));
            });
        }

    watchFiles()
        {

        }

    reload()
        {

        }

}



