"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const run = () => {
    var cron = require('node-cron');
    cron.schedule('5 * * * *', () => {
        console.log('running every minute');
    });
};
run();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Background services is running on port ${PORT}`);
});
