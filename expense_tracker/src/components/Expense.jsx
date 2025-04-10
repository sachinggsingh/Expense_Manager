import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Select,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "@/redux/expenseSlice";

const Expense = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: "",
    })


    const dispatch = useDispatch();
    const { expenses } = useSelector((state) => state.expenses);
    const [loading, setLoading] = useState(false);
    const [isOpen,setIsOpen] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((preData) => ({
            ...preData,
            [name]: value
        }))
    }
    const handleCategory = (value) => {
        setFormData((preData) => ({
            ...preData,
            category: value
        }))
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/expense/create', formData, {
                header: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                dispatch(setExpenses([...expenses, res.data.expense]));
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                setIsOpen(false);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center p-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className='cursor-pointer' onClick={() => setIsOpen(true)} variant="outline">Add Expense</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white border shadow-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                        <DialogDescription>
                            Add your expense details below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className=" grid gap-4 py-4">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder="Enter description"
                                    className="col-span-3"
                                    value={formData.description}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount
                                </Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    placeholder="Enter amount in ₹"
                                    className="col-span-3"
                                    value={formData.amount}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <div className="col-span-3">
                                    <Select onValueChange={handleCategory}>
                                        <SelectTrigger className="w-full bg-white border shadow">
                                            <SelectValue placeholder="Select the category" />
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
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? (
                                    <Button type="submit" disabled>
                                        <span className="loading loading-spinner"></span>
                                        Adding...
                                    </Button>
                                ) : (

                                    <Button type="submit">Add Expense</Button>
                                )
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Expense;
