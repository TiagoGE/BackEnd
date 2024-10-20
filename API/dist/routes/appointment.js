"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_1 = require("../Controllers/appointment");
const verifyToken_1 = require("../Middlewares/verifyToken");
const router = (0, express_1.Router)();
router.post('/', verifyToken_1.VerifyToken, appointment_1.createAppointment);
exports.default = router;
