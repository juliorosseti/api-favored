"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favored = void 0;
const uuidv4_1 = require("uuidv4");
class Favored {
    constructor(props, uuid) {
        Object.assign(this, props);
        if (!uuid) {
            this.uuid = (0, uuidv4_1.uuid)();
        }
    }
}
exports.Favored = Favored;
