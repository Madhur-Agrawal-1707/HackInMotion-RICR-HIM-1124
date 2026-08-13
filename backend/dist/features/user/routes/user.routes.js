"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_1 = require("../../../middleware/auth");
const validate_1 = require("../../../middleware/validate");
const user_validation_1 = require("../validation/user.validation");
const upload_1 = require("../../../middleware/upload");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// All user routes require authentication
router.use(auth_1.authenticate);
router.get('/profile', userController.getProfile);
router.patch('/profile', (0, validate_1.validate)(user_validation_1.updateProfileSchema), userController.updateProfile);
router.patch('/avatar', upload_1.upload.single('avatar'), userController.uploadAvatar);
router.delete('/account', userController.deleteAccount);
exports.default = router;
