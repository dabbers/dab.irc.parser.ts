"use strict";
var ChannelUserChangeMessage_1 = require('../MessageTypes/ChannelUserChangeMessage');
var DynamicParser_1 = require('../DynamicParser');
var Join = (function () {
    function Join() {
    }
    Join.prototype.parse = function (server, message, callback) {
        callback(server, new ChannelUserChangeMessage_1.ChannelUserChangeMessage(message));
        return true;
    };
    Join.prototype.init = function (context) {
        if (context.constructor == DynamicParser_1.DynamicParser) {
            var ctx = context;
            ctx.parserDictionary["JOIN"] = this;
            return;
        }
        throw "Invalid context passed to JOIN parser";
    };
    Join.prototype.resume = function (state) {
    };
    Join.prototype.uninit = function () {
        return null;
    };
    return Join;
}());
exports.Join = Join;
