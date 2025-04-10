// import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import {
//   Select,
//   SelectGroup,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import axios from "axios";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setExpenses, setSingleExpense } from "@/redux/expenseSlice";
// import { Edit } from "lucide-react";

// const UpdateExpense = ({ expense }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const { expenses, singleExpense } = useSelector((state) => state.expenses);
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     description: "",
//     amount: "",
//     category: "",
//   });


//   useEffect(() => {
//     if (singleExpense) {
//       setFormData({
//         description: singleExpense.description || "",
//         amount: singleExpense.amount ? Number(singleExpense.amount) : "",
//         category: singleExpense.category || "",
//       });
//     }
//   }, [singleExpense]);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((preData) => ({
//       ...preData,
//       [name]: value,
//     }));
//   };

//   const handleCategory = (value) => {
//     setFormData((preData) => ({
//       ...preData,
//       category: value,
//     }));
//   };
//   const submitHandler = async (e)=> {
//     e.preventDefault();
//     setLoading(true);

//     try{
//       const res = await axios.put(`http://localhost:8000/expense/update/${expense._id}`, formData,{
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       console.log(res.data);
//       if (res.data.success) {
//         const updatedExpenses = expenses.map((exp) =>
//           exp._id === expense._id ? res.data.expense : exp
//         );
//         dispatch(setExpenses(updatedExpenses));
//         toast.success(res.data.message);
//         setIsOpen(false);
//       }
//     }
//     catch(error)
//     {
//       console.log("Error" , error);
//       toast.error("Error updating the expense");
//     }
//     finally{
//       setLoading(false);
//       setIsOpen(false);
//     }
//   }
//   return (
//     <div className="flex items-center justify-center p-4">
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogTrigger asChild>
//           <Button className="bg-slate-400"
//             onClick={() =>
//               dispatch(setSingleExpense(expense)) && setIsOpen(true)
//             }
//           >
//             <Edit></Edit>
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] bg-white border shadow-lg">
//           <DialogHeader>
//             <DialogTitle>Edit your Expense</DialogTitle>
//             <DialogDescription>
//               Edit your expense details below.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={submitHandler} className="grid gap-4 py-4">
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="title" className="text-right">
//                   Description
//                 </Label>
//                 <Input
//                   id="description"
//                   name="description"
//                   placeholder="Enter description"
//                   className="col-span-3"
//                   value={formData.description}
//                   onChange={handleInput}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="amount" className="text-right">
//                   Amount
//                 </Label>
//                 <Input
//                   id="amount"
//                   name="amount"
//                   type="number"
//                   placeholder="Enter amount in ₹"
//                   className="col-span-3"
//                   value={formData.amount}
//                   onChange={handleInput}
//                 />
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="category" className="text-right">
//                   Category
//                 </Label>
//                 <div className="col-span-3">
//                   <Select
//                     value={formData.category}
//                     onValueChange={handleCategory}
//                   >
//                     <SelectTrigger className="w-full bg-white border shadow">
//                       <SelectValue placeholder="Select the category" />
//                     </SelectTrigger>
//                     <SelectContent
//                       position="popper"
//                       side="bottom"
//                       align="start"
//                       className="bg-white border shadow-lg w-[--radix-select-trigger-width]"
//                     >
//                       <SelectGroup>
//                         <SelectItem value="rent">Rent</SelectItem>
//                         <SelectItem value="food">Food</SelectItem>
//                         <SelectItem value="salary">Salary</SelectItem>
//                         <SelectItem value="groceries">Groceries</SelectItem>
//                         <SelectItem value="shopping">Shopping</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button type="submit" disabled>
//                   <span className="loading loading-spinner"></span>
//                   Updating...
//                 </Button>
//               ) : (
//                 <Button type="submit">Update Expense</Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateExpense;


"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import axios from "axios"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setExpenses, setSingleExpense } from "@/redux/expenseSlice"
import { Edit } from "lucide-react"

const UpdateExpense = ({ expense }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { expenses, singleExpense } = useSelector((state) => state.expenses)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  })

  // Set form data when dialog opens or singleExpense changes
  useEffect(() => {
    if (singleExpense) {
      setFormData({
        description: singleExpense.description || "",
        amount: singleExpense.amount ? Number(singleExpense.amount) : "",
        category: singleExpense.category || "",
      })
    }
  }, [singleExpense])

  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }))
  }

  const handleCategory = (value) => {
    setFormData((preData) => ({
      ...preData,
      category: value,
    }))
  }

  const handleOpenChange = (open) => {
    if (open) {
      dispatch(setSingleExpense(expense))
    }
    setIsOpen(open)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.put(`http://localhost:8000/expense/update/${expense._id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      if (res.data.success) {
        // Create a new array with the updated expense
        const updatedExpenses = expenses.map((exp) => (exp._id === expense._id ? res.data.expense : exp))

        // Update the Redux store with the new array
        dispatch(setExpenses(updatedExpenses))

        // Also update the singleExpense in Redux to keep it in sync
        dispatch(setSingleExpense(res.data.expense))

        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("Error", error)
      toast.error("Error updating the expense")
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="bg-green-200 cursor-pointer">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white border shadow-lg">
          <DialogHeader>
            <DialogTitle>Edit your Expense</DialogTitle>
            <DialogDescription>Edit your expense details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler} className="grid gap-4 py-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
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
                  <Select value={formData.category} onValueChange={handleCategory}>
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
              {loading ? (
                <Button type="submit" disabled>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </Button>
              ) : (
                <Button type="submit">Update Expense</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateExpense

