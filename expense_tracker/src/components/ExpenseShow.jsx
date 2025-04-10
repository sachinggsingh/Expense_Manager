import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { setExpenses } from "@/redux/expenseSlice";
import UpdateExpense from "./UpdateExpense";

const ExpenseShow = () => {
  const dispatch = useDispatch();
  const { expenses = [] } = useSelector((state) => state.expenses) || {
    expenses: [],
  };
  const [totalIs, setTotalIs] = useState(0);

  const handleCheckbox = async (id) => {
    const currentExpense = expenses.find((exp) => exp?._id === id);
    if (!currentExpense) {
      toast.error("Expense not found.");
      return;
    }
    try {
      const newStatus = !currentExpense.done;
      dispatch(
        setExpenses(
          expenses.map((exp) =>
            exp?._id === id ? { ...exp, done: newStatus } : exp
          )
        )
      );

      const res = await axios.patch(
        `http://localhost:8000/expense/mark/${id}`,
        {
          done: newStatus,
          description: currentExpense.description,
          amount: currentExpense.amount,
          category: currentExpense.category,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Status updated successfully");
      } else {
        dispatch(setExpenses(expenses));
        toast.error("Failed to update status");
      }
    } catch (err) {
      dispatch(setExpenses(expenses));
      console.error("Checkbox update error:", err);
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/expense/remove/${expenseId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Expense Deleted");
        dispatch(
          setExpenses(expenses.filter((item) => item?._id !== expenseId))
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to Delete");
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      expenses?.forEach((expense) => {
        if (expense?.done) {
          total += expense?.amount || 0;
        }
      });
      setTotalIs(total);
    };

    if (Array.isArray(expenses)) {
      calculateTotal();
    }
  }, [expenses, setTotalIs]);

  return (
    <Table>
      <TableCaption>
        A list of your{" "}
        <b>
          <i>Expenses</i>
        </b>
      </TableCaption>
      <TableHeader>
        <TableRow className="font-bold">
          <TableHead className="w-[100px]">Mark as done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="font-bold text-center">
              <span>Please add some expenses</span>
            </TableCell>
          </TableRow>
        ) : (
          expenses.filter(Boolean).map((item) => (
            <TableRow key={item?._id}>
              <TableCell className="font-medium">
                <Checkbox
                  checked={item?.done || false}
                  onCheckedChange={() => handleCheckbox(item?._id)}
                  className="cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
              </TableCell>
              <TableCell className={item?.done ? "line-through" : ""}>
                {item?.description || "N/A"}
              </TableCell>
              <TableCell className={item?.done ? "line-through" : ""}>
                ₹{item?.amount || 0}
              </TableCell>
              <TableCell className={item?.done ? "line-through" : ""}>
                {item?.category
                  ? item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)
                  : "N/A"}
              </TableCell>
              <TableCell className={item?.done ? "line-through" : ""}>
                {item?.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDelete(item?._id)}
                    className="mt-4 bg-black cursor-pointer"
                    variant="destructive"
                  >
                    <Trash />
                  </Button>
                  <UpdateExpense expense={item} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow className="font-bold text-xl">
          <TableCell className="font-bold">Total amount Paid :</TableCell>
          <TableCell className="font-italic">₹{totalIs}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseShow;
