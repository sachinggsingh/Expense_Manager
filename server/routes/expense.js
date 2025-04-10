const express = require("express");
const router = express.Router();
// const isAuth = require("../middleware/auth");
const {
  createExpense,
  getAllExpense,
  markDoneOrUndone,
  removeExpense,
  updateExpense,
} = require("../controller/expense");

const isAuth = require("../middleware/auth");

router.route("/create").post(isAuth, createExpense);
router.route("/getAll").get(isAuth, getAllExpense);
router.route("/mark/:id").patch(isAuth, markDoneOrUndone);
router.route("/remove/:id").delete(isAuth, removeExpense);
router.route("/update/:id").put(isAuth, updateExpense);

module.exports = router;
