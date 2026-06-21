export function getIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

export function getExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

export function getBalance(transactions) {
  return getIncome(transactions) - getExpenses(transactions);
}

export function getByCategory(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount);
    });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach((t) => {
    const month = t.date?.substring(0, 7); // "2026-06"
    if (!map[month]) map[month] = { month, income: 0, expense: 0 };
    if (t.type === "income") map[month].income += Number(t.amount);
    else map[month].expense += Number(t.amount);
  });
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
}
