import jsPDF from "jspdf";

export function exportToPDF(transactions) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("UniBudget — Transaction Report", 14, 20);
  doc.setFontSize(11);

  let y = 35;
  const headers = ["Date", "Type", "Category", "Description", "Amount"];
  headers.forEach((h, i) => doc.text(h, 14 + i * 38, y));
  y += 6;
  doc.line(14, y, 196, y);
  y += 6;

  transactions.forEach((t) => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(t.date || "", 14, y);
    doc.text(t.type || "", 52, y);
    doc.text(t.category || "", 90, y);
    doc.text((t.description || "").substring(0, 14), 128, y);
    doc.text(`Rs. ${t.amount}`, 166, y);
    y += 8;
  });

  doc.save("transactions.pdf");
}
