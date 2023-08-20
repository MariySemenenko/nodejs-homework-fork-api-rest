const express = require("express");
const upload = require("../../middlewares/upload")
const { validateBody} = require("../../middlewares");
const { authenticate, validateSubscription } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");


const router = express.Router();//create empty router

 router.post("/register", validateBody(schemas.registerSchema), ctrl.register);//https://localhost:3000/users/register

 router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

 router.get("/current", authenticate, ctrl.getCurrent);

 router.post("/logout", authenticate, ctrl.logout)

 router.patch("/", authenticate, validateSubscription(schemas.subscriptionSchema), ctrl.changeSubscription);

 router.patch("/avatar", authenticate, upload.single("avatar"), ctrl.updateAvatar)//http://localhost:3000/users/avatar

 router.patch('/id/favorite', authenticate, ctrl.updateAvatar)

module.exports = router;