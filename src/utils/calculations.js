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