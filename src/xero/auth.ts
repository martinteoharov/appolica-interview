import axios from "axios";

export interface XeroToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const getXeroToken = async (): Promise<XeroToken> => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    scope: "accounting.transactions accounting.transactions.read",
  });

  console.log(process.env.XERO_CLIENT_ID);

  const { data } = await axios.post(
    "https://identity.xero.com/connect/token",
    params,
    {
      auth: {
        username: process.env.XERO_CLIENT_ID!,
        password: process.env.XERO_CLIENT_SECRET!,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return data;
};

export const getXeroTenantId = async (accessToken: string) => {
  const { data } = await axios.get("https://api.xero.com/connections", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return data[0].tenantId;
};
