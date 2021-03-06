import * as Core from 'dab.irc.core/src';
import { ParserServer } from '../ParserServer';
export declare class ModeChangeMessage extends Core.Message {
    constructor(msg: Core.Message, server: ParserServer);
    readonly modes: Core.Mode[];
    readonly destination: Core.Target.ITarget;
    protected _modes: Core.Mode[];
    protected _target: Core.Target.ITarget;
    toString(): string;
    updateDestinationReference(dest: Core.Target.ITarget): void;
}
