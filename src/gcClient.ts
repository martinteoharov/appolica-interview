import axios from "axios";
import { goCardlessConfig } from "./config";

export const createGCClient = () =>
  axios.create({
    baseURL: goCardlessConfig.sandbox
      ? "https://bankaccountdata.gocardless.com/api/v2"
      : "https://bankaccountdata.gocardless.com/api/v2",
    headers: {
      Authorization: `Bearer ${goCardlessConfig.accessToken}`,
      "Content-Type": "application/json",
      "GoCardless-Version": "2023-06-01",
    },
  });
