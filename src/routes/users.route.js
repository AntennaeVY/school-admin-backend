const { Router } = require("express");
const router = Router();

// Controllers
const { createUser } = require("../controllers/users/create.controller");
const { updateOneById } = require("../controllers/users/update.controller");
const { deleteOneById } = require("../controllers/users/delete.controller");
const {
  getAllUsers,
  getOneById,
  getOneByEmail,
} = require("../controllers/users/read.controller");

// Middlewares
const { isAuth } = require("../middlewares/isAuth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

// Create
router.post("/users", createUser);

// Read
router.get("/users", isAuth, getAllUsers);
router.get("/users/id/:id", isAuth, getOneById);
router.post("/users/email", isAuth, getOneByEmail);

// Update
router.put("/users/id/:id", isAuth, isAdmin, updateOneById);

// Delete
router.delete("/users/id/:id", isAuth, isAdmin, deleteOneById);

module.exports = router;
