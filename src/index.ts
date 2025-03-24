import { serve } from "bun";
import {
  createAgreement,
  createRequisition,
  fetchAccounts,
  fetchTransactions,
} from "./api";
import { processXeroUpload } from "./xero";

let activeRequisitionId: string | null = null;

serve({
  port: 3001,
  tls: {
    key: Bun.file("./certs/key.pem"),
    cert: Bun.file("./certs/cert.pem"),
  },
  async fetch(req) {
    const url = new URL(req.url);

    try {
      // start flow with GoCardless authentication
      if (url.pathname === "/auth") {
        // create agreement
        console.log("Creating agreement...");
        const agreement = await createAgreement();

        // create requisition
        console.log("Creating requisition...");
        const requisition = await createRequisition(agreement.id);
        activeRequisitionId = requisition.id;

        // redirect to bank authorization
        console.log("Redirecting user to authenticate with bank...");
        return Response.redirect(requisition.link);
      }

      // handle GoCardless callback
      if (url.pathname === "/callback") {
        if (!activeRequisitionId) throw new Error("No active requisition");

        // get accounts using requisition ID
        console.log("Fetching accounts...");
        const accountId = await fetchAccounts(activeRequisitionId);

        // fetch transactions
        console.log("Fetching transactions...");
        const { transactions } = await fetchTransactions(
          accountId,
          "2024-01-01",
        );

        processXeroUpload(transactions.booked);

        return new Response(JSON.stringify(transactions, null, 2), {
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response("Visit /auth to start");
    } catch (error) {
      console.error(error);
      return new Response("Error occurred - check server logs", {
        status: 500,
      });
    }
  },
});

console.log("Visit https://localhost:3001/auth");
