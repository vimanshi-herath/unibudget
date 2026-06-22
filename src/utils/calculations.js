export function getIncome(transactions) {
  return transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
}

export function getExpenses(transactions) {
  return transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions) {
  return getIncome(transactions) - getExpenses(transactions);
}

export function getByCategory(transactions) {
  return transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
}

export function getMonthlyData(transactions) {
  const monthly = {};
  transactions.forEach(t => {
    const date = t.date?.toDate ? t.date.toDate() : new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!monthly[key]) monthly[key] = { month: key, income: 0, expense: 0 };
    if (t.type === "income") monthly[key].income += t.amount;
    else monthly[key].expense += t.amount;
  });
  return Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month));
}