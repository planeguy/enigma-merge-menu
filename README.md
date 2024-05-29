# enigma-merge-menu
## A little tool for merging hjson into an enigma1/2 bbs menu

## ENIGMA1/2 now supports menu fragements and imports... you don't need my project anymore! :)
See how that works here: https://nuskooler.github.io/enigma-bbs/configuration/config-files.html

## install

``` npm install @saplaneguy/enigma-merge-menu ```

## setup

set up a project for your menu work with a folder for your menu fragments and a copy of your bbs-menu.hjson

```
menus/
my-bbs-menu.hjson
package.json
```

your bbs menu should have an empty menus node

```json
{
    "menus":{},
    "i dunno maybe there'll be other things":true
}
```

your menu fragment files should be a single object with menu entries in it (i.e. you should be able to set "menus":<the fragment> and it should work)

for example a fragment "**logoff.hjon**" would look like:

```
{
    logoff:{
        art: logoff
        desc: Logging Off
        next: @systemMethod:logoff
    }
}
```

you can totally have multiple menus in one fragment as well

## use

in your package.json, create a script that uses enigma-merge-menu to merge everything together and save to a new file

```json
{
    "name":"my-bbs-menu",
    "version":"1.0.0",
    "scripts":{
        "build":"enigma-merge-menu --menu my-bbs-menu.hjson --includeDir menus/--targetDir \\\\mybbs-pi/enigmabbs/config/"
    }
}
```

then build your menu using npm:
```
npm run build
```

i have my bbs on a samba share so i send it straight there, but you could also save it locally, then use another script to deploy to the bbs or set up file watch on your fragments folder it's really up to you.

## api
```
Usage: enigma-merge-menu [options]

Options:
  -m, --menu <menu>              menu file
  -i, --includeDir <includeDir>  diretory of fragments to include
  -t, --targetDir <targetDir>    target directory of output menu
  -h, --help                     display help for command
  ```
