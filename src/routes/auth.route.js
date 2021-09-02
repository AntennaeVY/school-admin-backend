const { Router } = require("express");
const router = Router();

const { login } = require("../controllers/auth/login.controller");

router.post("/login", login);

module.exports = router;
