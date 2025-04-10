const Expense = require("../model/expense");

const createExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.user;
    if (!description || !amount || !category) {
      return res
        .status(400)
        .json({ msg: "All fields are required", success: false });
    }
    const expense = await Expense.create({
      description,
      amount,
      category,
      userId,
    });
    res
      .status(201)
      .json({ msg: "Expense created successfully", success: true, expense });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const userid = req.user;
    if (!userid) {
      return res.status(401).json({
        msg: "Authorization required",
        success: false,
      });
    }
    const userId = req.user;
    let category = req.query.category || "";
    const done = req.query.done || null;
    const query = {
      userId,
    };
    if (category.toLowerCase().includes("all")) category = "";
    else query.category = { $regex: category, $options: "i" };

    if (done?.toLowerCase() === "done") query.done = true;
    else if (done?.toLowerCase() === "undone") query.done = false;

    const expense = await Expense.find(query);
    if (!expense || expense.length === 0)
      return res
        .status(400)
        .json({ msg: "Expense not found", expense, success: false });
    else
      return res
        .status(200)
        .json({ msg: "Expense found", success: true, expense });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};

const markDoneOrUndone = async (req, res) => {
  try {
    const { description, amount, category, done } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({
        msg: "Please provide all required fields",
        success: false,
      });
    }

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { done, description, amount, category },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        msg: "Expense not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Expense marked successfully",
      expense: {
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
        done: expense.done || false,
        _id: expense._id,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Something went wrong",
      success: false,
    });
  }
};

const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByIdAndDelete(expenseId);
    if (!expense)
      res.status(400).json({ msg: "Expense not found", success: false });
    else
      res
        .status(200)
        .json({ msg: "Expense deleted successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { description, amount, category } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      { description, amount, category },
      { new: true }
    );
    if (!expense)
      res.status(400).json({ msg: "Expense not found", success: false });
    else
      res
        .status(200)
        .json({ msg: "Expense updated successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};

module.exports = {
  createExpense,
  getAllExpense,
  markDoneOrUndone,
  removeExpense,
  updateExpense,
};
