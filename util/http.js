import axios from "axios";

const BACKEND_URL = "https://react-native-expenses-f1714-default-rtdb.firebaseio.com"

export function storeExpense(expenseData) {
  axios.post(BACKEND_URL + "/expenses.json", expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount, // "[key]" is not an array!! it's a a way to access an object property dynamically
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj)
  }
  console.log(expenses)
  return expenses
}
