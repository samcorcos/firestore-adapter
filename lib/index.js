"use strict";
// import { convert } from './adapter';
// import { data } from './resource';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const output = convert(data);
// console.log(JSON.stringify(output));
var adapter_1 = __importDefault(require("./adapter"));
exports.convert = adapter_1.default;
exports.default = adapter_1.default;
