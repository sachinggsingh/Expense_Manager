// Desc: Custom hook to fetch expenses from the server
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setExpenses } from "@/redux/expenseSlice";
import { toast } from "sonner";

const useGetExpense = () => {
    const dispatch = useDispatch();
    const { category, markAsDone } = useSelector((state) => ({
        category: state.expenses?.category || 'all',
        markAsDone: state.expenses?.markAsDone || false
    }));

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/expense/getAll?category=${category}&done=${markAsDone}`,
                    { withCredentials: true }
                );

                if (response.data.success) {
                    dispatch(setExpenses(response.data.expense));
                } else {
                    toast.error("Failed to fetch expenses");
                }
            } catch (error) {
                console.error("Fetch expense error:", error);
                toast.error(error.response?.data?.message || "No expenses found");
            }
        };

        fetchExpense();
    }, [dispatch, category, markAsDone]);

    return { category, markAsDone };
};

export default useGetExpense;