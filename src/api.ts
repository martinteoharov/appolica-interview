import { createGCClient } from "./gcClient";
import { config } from "./config";

export const createAgreement = async () => {
  const client = createGCClient();
  const { data } = await client.post("/agreements/enduser/", {
    institution_id: config.institution_id,
    max_historical_days: 90, // note: depends on the institution
    access_valid_for_days: 90, // note: depends on the institution
    access_scope: ["balances", "details", "transactions"],
  });
  return data;
};

export const createRequisition = async (agreementId: string) => {
  const client = createGCClient();
  const { data } = await client.post("/requisitions/", {
    redirect: config.redirect_uri,
    institution_id: config.institution_id,
    agreement: agreementId,
    user_language: "EN",
  });
  return data;
};

export const getRequisition = async (requisitionId: string) => {
  const client = createGCClient();
  const { data } = await client.get(`/requisitions/${requisitionId}/`);
  return data;
};

export const fetchAccounts = async (requisitionId: string) => {
  const requisition = await getRequisition(requisitionId);
  return requisition.accounts[0];
};

export const fetchTransactions = async (
  accountId: string,
  dateFrom?: string,
  dateTo?: string,
) => {
  const client = createGCClient();
  const { data } = await client.get(`/accounts/${accountId}/transactions/`, {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
    },
  });
  return data;
};
