import { getXeroTenantId, getXeroToken } from "./auth";
import { convertToXeroCSV } from "./csv";
import { createReadStream } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { uploadCSVToXero } from "./upload";

export const processXeroUpload = async (transactions: any[]) => {
  try {
    // convert to Xero CSV format
    console.log(
      `Converting ${transactions.length} transactions to Xero CSV...`,
    );
    const csvContent = convertToXeroCSV(transactions);

    // create temporary file
    console.log("Creating temporary file...");
    const tempPath = join(tmpdir(), `xero-upload-${Date.now()}.csv`);
    require("fs").writeFileSync(tempPath, csvContent);

    // upload to Xero
    console.log("Uploading to Xero...");
    await uploadCSVToXero(tempPath);

    // cleanup
    console.log("Cleaning up...");
    require("fs").unlinkSync(tempPath);
  } catch (error) {
    console.error("Xero upload failed:");

    console.log(error);
    // throw error;
  }
};
