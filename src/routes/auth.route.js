const { Router } = require("express");
const router = Router();

const { login } = require("../controllers/auth/login.controller");

router.post("/auth/login", login);

module.exports = router;
