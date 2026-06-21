import Papa from "papaparse";

export function exportToCSV(transactions, filename = "transactions.csv") {
  const data = transactions.map((t) => ({
    Date: t.date,
    Type: t.type,
    Category: t.category,
    Description: t.description,
    Amount: t.amount,
  }));
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
