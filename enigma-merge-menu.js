#!/usr/bin/env node

const hjson = require('hjson');
const fs = require('fs-extra');
const {Command} = require('commander');
const path = require('path');

async function mergemenu(mainmenufile,includeDir, targetDir){
    //open mainmenufile
    let includedFiles = await fs.readdir(includeDir);
    let m = hjson.rt.parse((await fs.readFile(mainmenufile,"utf8")));
    for(let n=0;n<includedFiles.length;n++){
        m.menus={...m.menus,...hjson.rt.parse((await fs.readFile(path.join(includeDir,includedFiles[n]),"utf8")))};
    }
    fs.writeFile(path.join(targetDir,path.parse(mainmenufile).base),hjson.rt.stringify(m));
}

const program = new Command();
program
.option('-m, --menu <menu>', 'menu file')
.option('-i, --includeDir <includeDir>','diretory of fragments to include')
.option('-t, --targetDir <targetDir>', 'target directory of output menu');

program.parse(process.argv);

if(program.menu==undefined || program.includeDir==undefined || program.targetDir==undefined){
    console.log('you need all the settings. bub!');
} else {
    //do a menu merge
    console.log(program.menu,program.includeDir,program.targetDir);
    mergemenu(program.menu,program.includeDir,program.targetDir);
}