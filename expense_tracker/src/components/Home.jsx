import React from "react";
import Navbar from "./Navbar";
import Expense from "./Expense";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import ExpenseShow from "./ExpenseShow";
import { useDispatch } from 'react-redux';
import { setCategory ,setMarkAsDone} from   '@/redux/expenseSlice';
import useGetExpense from "@/hooks/useGetExpense";


const Home = () => {
  useGetExpense();
const dispatch = useDispatch();
  const categoryHandler = (value) => {
    dispatch(setCategory(value));
  }
  const doneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  }
  
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-3">
        <div className="flex gap-x-150 justify-center items-center mb-4">
          <h1 className="font-semibold text-2xl"><i><b>Expense Manager</b></i></h1>
          <Expense />
        </div>
        <div className="flex items-center gap-2 my-5">
          <h1 className="font-medium text-lg ">Filter :</h1>
          <Select onValueChange={categoryHandler} defaultValue="all">
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="bg-white border shadow-lg w-[--radix-select-trigger-width]"
            >
              <SelectGroup>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>



          <Select onValueChange={doneHandler} defaultValue="all"> 
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Mark as" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="bg-white border shadow-lg w-[--radix-select-trigger-width]"
            >
              <SelectGroup>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>



        </div>
        <ExpenseShow />
      </div>
    </div>
  );
};

export default Home;
