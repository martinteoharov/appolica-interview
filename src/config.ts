import { config } from "dotenv";

config();

interface XeroConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  bankAccountId: string;
  email: string;
  password: string;
  otpSecret: string;
}

interface GoCardlessConfig {
  accessToken: string;
  redirectUri: string;
  institutionId: string;
  sandbox: boolean;
}

export const xeroConfig: XeroConfig = {
  clientId: process.env.XERO_CLIENT_ID!,
  clientSecret: process.env.XERO_CLIENT_SECRET!,
  redirectUri: process.env.XERO_REDIRECT_URI!,
  bankAccountId: process.env.XERO_BANK_ACCOUNT_ID!,
  email: process.env.XERO_EMAIL!,
  password: process.env.XERO_PASSWORD!,
  otpSecret: process.env.XERO_OTP_SECRET!,
};

export const goCardlessConfig: GoCardlessConfig = {
  accessToken: process.env.GC_ACCESS_TOKEN!,
  redirectUri: process.env.GC_REDIRECT_URI!,
  institutionId: process.env.GC_INSTITUTION_ID!,
  sandbox: process.env.GC_SANDBOX === "true",
};
