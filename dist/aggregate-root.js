"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const INTERNAL_EVENTS = Symbol();
const IS_AUTO_COMMIT_ENABLED = Symbol();
class AggregateRoot {
    constructor() {
        this[_a] = false;
        this[_b] = [];
    }
    set autoCommit(value) {
        this[IS_AUTO_COMMIT_ENABLED] = value;
    }
    get autoCommit() {
        return this[IS_AUTO_COMMIT_ENABLED];
    }
    publish(event) { }
    commit() {
        this[INTERNAL_EVENTS].forEach(event => this.publish(event));
        this[INTERNAL_EVENTS].length = 0;
    }
    uncommit() {
        this[INTERNAL_EVENTS].length = 0;
    }
    getUncommittedEvents() {
        return this[INTERNAL_EVENTS];
    }
    loadFromHistory(history) {
        return __awaiter(this, void 0, void 0, function* () {
            history.forEach((event) => __awaiter(this, void 0, void 0, function* () { return yield this.apply(event, true); }));
        });
    }
    apply(event, isFromHistory = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isFromHistory && !this.autoCommit) {
                this[INTERNAL_EVENTS].push(event);
            }
            this.autoCommit && this.publish(event);
            const handler = this.getEventHandler(event);
            handler && (yield handler.call(this, event));
        });
    }
    getEventHandler(event) {
        const handler = `on${this.getEventName(event)}`;
        return this[handler];
    }
    getEventName(event) {
        const { constructor } = Object.getPrototypeOf(event);
        return constructor.name;
    }
}
_a = IS_AUTO_COMMIT_ENABLED, _b = INTERNAL_EVENTS;
exports.AggregateRoot = AggregateRoot;
