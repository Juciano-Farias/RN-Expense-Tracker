import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../context/expenses-context";
import { getDateMinusDay } from "../util/date";
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'

const RecentExpenses = () => {
  const [isFecthing, setIsFetching] = useState(true)
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      const expenses = await fetchExpenses()
      setIsFetching(false)
      expensesContext.setExpenses(expenses)
    }

    getExpenses()
  }, [])

  if(isFecthing) {
    return <LoadingOverlay />
  }

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
