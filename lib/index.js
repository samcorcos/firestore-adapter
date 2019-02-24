"use strict";
// import Adapter from './adapter';
// import { data } from './resource';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const adapter = new Adapter(data);
// console.log(JSON.stringify(adapter.convert()));
var adapter_1 = __importDefault(require("./adapter"));
exports.Adapter = adapter_1.default;
exports.default = adapter_1.default;
