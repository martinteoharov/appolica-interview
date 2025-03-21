import axios from "axios";
import { config } from "./config";

export const createGCClient = () =>
  axios.create({
    baseURL: config.sandbox
      ? "https://bankaccountdata.gocardless.com/api/v2"
      : "https://bankaccountdata.gocardless.com/api/v2",
    headers: {
      Authorization: `Bearer ${config.access_token}`,
      "Content-Type": "application/json",
      "GoCardless-Version": "2023-06-01",
    },
  });
