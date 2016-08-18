import * as Core from 'dab.irc.core/src';
import {getParsers} from './Parsers';
import {IParser} from './IParser';
import {ParserServer} from './ParserServer';

export class DynamicParser implements IParser<any>, Core.IModuleHandler<DynamicParser> {
    parserDictionary : {[key:string] : IParser<any>} = {};

    constructor() {
    }

    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        if (this.parserDictionary[message.command]) {
            return this.parserDictionary[message.command].parse(server, message, callback);
        }

        return false;
    }

    load(name: string) : Core.IModuleHandler<DynamicParser> {

        let fullPath = __dirname + "\\Parsers\\" + name;
        if (require.cache[fullPath + ".js"]) delete require.cache[fullPath + ".js"];
        let obj = require(fullPath);
        let indx = Object.keys(obj)[0]; // the obj will have obj.FunctionName since we export classes in the modules.

        let fnc = obj[indx];

        if (!fnc) throw "Could not load module: " + name;

        let inst: IParser<any> = new fnc();

        inst.init(this);
        
        this.parsers.push( inst );

        return this;
    }

    unload(name: string, persist: boolean) : Core.IModuleHandler<DynamicParser> {

        return this;
    }
    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {

    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {

    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        return null;
    }

    private parsers : IParser<any>[] = [];
}