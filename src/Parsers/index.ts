import fs = require('fs');
import {IParser} from '../IParser';

export function getParsers() : IParser<any>[] {
    var paths = fs.readdirSync(__dirname);
    var parsers : IParser<any>[] = [];

    for(var i in paths) {
        if (paths[i].indexOf("index") == 0) continue;
        if (paths[i].indexOf(".ts") > 0 || paths[i].indexOf(".map") > 0) continue;
        var tmp = require( __dirname + "/" + paths[i]);

        tmp = tmp[Object.keys(tmp)[0]];

        parsers.push( new tmp ());
    }

    return parsers;
}