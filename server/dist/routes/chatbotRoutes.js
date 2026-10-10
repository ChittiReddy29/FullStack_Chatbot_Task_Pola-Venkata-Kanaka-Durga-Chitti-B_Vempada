"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbotController_js_1 = require("../controllers/chatbotController.js");
const router = (0, express_1.Router)();
router.post('/message', chatbotController_js_1.handleChatMessage);
exports.default = router;
