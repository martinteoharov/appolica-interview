import { serve } from "bun";
import {
  createAgreement,
  createRequisition,
  fetchAccounts,
  fetchTransactions,
} from "./api";

let activeRequisitionId: string | null = null;

serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    try {
      // start flow with GoCardless authentication
      if (url.pathname === "/auth") {
        // create agreement
        const agreement = await createAgreement();

        // create requisition
        const requisition = await createRequisition(agreement.id);
        activeRequisitionId = requisition.id;

        // redirect to bank authorization
        return Response.redirect(requisition.link);
      }

      // handle GoCardless callback
      if (url.pathname === "/callback") {
        if (!activeRequisitionId) throw new Error("No active requisition");

        // get accounts using requisition ID
        const accountId = await fetchAccounts(activeRequisitionId);

        // fetch transactions
        const transactions = await fetchTransactions(accountId, "2024-01-01");

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

console.log("Visit http://localhost:3001/auth");
