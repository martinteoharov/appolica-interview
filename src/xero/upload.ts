// src/xero/upload.ts
import puppeteer from "puppeteer";
import { xeroConfig } from "../config";

export const uploadCSVToXero = async (csvPath: string = "transactions.csv") => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1080, height: 1024 });

    // navigate to Xero login page
    await page.goto("https://login.xero.com/identity/user/login");

    // enter login credentials using locators
    await page
      .locator('[data-automationid="Username--input"]')
      .fill(xeroConfig.email);
    await page
      .locator('[data-automationid="PassWord--input"]')
      .fill(xeroConfig.password);
    await page.locator('[data-automationid="LoginSubmit--button"]').click();

    await page.waitForNavigation();

    // navigate to manual transaction upload page
    try {
      await page.goto(
        `https://go.xero.com/app/!!!v1x/manual-transaction-upload/${xeroConfig.bankAccountId}`,
      );
    } catch (error) {
      console.error("Navigation failed:", error);
    }

    await page.waitForSelector('button.xui-button-small[type="button"]');

    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click('button.xui-button-small[type="button"]'),
    ]);

    console.log(fileChooser);

    await fileChooser.accept([csvPath]);

    // click upload button
    await page
      .locator('[data-automationid="wizard-next-step-button"]')
      .setTimeout(30000)
      .click();

    // click upload button
    await page
      .locator('[data-automationid="wizard-next-step-button"]')
      .setTimeout(30000)
      .click();

    await page
      .locator('[data-automationid="wizard-next-step-button"]')
      .setTimeout(30000)
      .click();

    console.log("CSV file uploaded successfully to Xero");
  } catch (error) {
    console.error("Error during Xero upload:", error);
    // take a screenshot for debugging
  } finally {
    await browser.close();
  }
};

uploadCSVToXero("transactions.csv");
