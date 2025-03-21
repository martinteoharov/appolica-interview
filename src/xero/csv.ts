interface Transaction {
  bookingDate: string;
  transactionAmount: {
    amount: string;
    currency: string;
  };
  creditorName?: string;
  remittanceInformationUnstructured?: string;
  transactionId: string;
}

export const convertToXeroCSV = (transactions: Transaction[]): string => {
  const header = "Date,Amount,Payee,Description,Reference\n";

  const rows = transactions
    .map((t) => {
      const amount = parseFloat(t.transactionAmount.amount);
      const formattedAmount = amount.toFixed(2);

      return {
        Date: t.bookingDate,
        Amount: formattedAmount,
        Payee: t.creditorName || "Unknown",
        Description: t.remittanceInformationUnstructured || "Transaction",
        Reference: t.transactionId,
      };
    })
    .map(
      (r) =>
        `${r.Date},${r.Amount},"${r.Payee}","${r.Description}","${r.Reference}"`,
    )
    .join("\n");

  return header + rows;
};
