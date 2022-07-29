import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://react-native-expenses-f1714-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
}
