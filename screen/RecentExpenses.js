import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../context/expenses-context";
import { getDateMinusDay } from "../util/date";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDay(today, 7);

    return expense.date > dateSevenDaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
