"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_1 = __importDefault(require("./adapter"));
var resource_1 = require("./resource");
var adapter = new adapter_1.default(resource_1.data);
console.log(JSON.stringify(adapter.convert()));
