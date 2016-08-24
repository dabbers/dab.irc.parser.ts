import {IParser} from '../IParser';
import * as Core from 'dab.irc.core/src';
import {ConversationMessage} from '../MessageTypes/ConversationMessage';
import {ParserServer} from '../ParserServer';
import {DynamicParser} from '../DynamicParser';
import {Events} from '../EventList';

export class Privmsg implements IParser<any> {
    
    parse(server: ParserServer, message : Core.Message, callback : (server :ParserServer, message : Core.Message) => any) : boolean {
        callback(server, new ConversationMessage(message, server));
        return true;
    }

    // Create a new instance of this module. Initialize and do things as needed
    init(context : any) : void {
        if (context instanceof DynamicParser) {
            this.ctx = <DynamicParser>context;
            this.ctx.parserDictionary[Events.PRIVMSG] = this;
            this.ctx.parserDictionary[Events.NOTICE] = this;
            
            return;
        }

        // Todo: make this more classy
        throw new Error("Invalid context passed to NOTICE/PRIVMSG parser");
    }

    // We are resuming. No state required for a parser
    resume(state : any) : void {
        throw new Error("Don't resume a parser. Please call init");
    }

    // Unloading this module. No state needed for callback.
    uninit() : any {
        delete this.ctx.parserDictionary[Events.PRIVMSG];
        delete this.ctx.parserDictionary[Events.NOTICE];
        return null;
    }
    private ctx:DynamicParser;
}