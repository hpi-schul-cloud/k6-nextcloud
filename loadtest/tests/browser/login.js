import { check, sleep } from "k6";
import { chromium } from "k6/experimental/browser";
import { getUser } from "../../lib/auth/login.js";

export const options = JSON.parse(
  open(`../../config/options/${__ENV.OPTIONS_FILE}`)
);

export default async function () {
  const browser = chromium.launch({
    headless: true,
    args: ["no-sandbox"],
    timeout: "60s",
  });
  const page = browser.newPage();
  page.setDefaultTimeout(30);

  const user = getUser();

  try {
    await page.goto(__ENV.ENVIRONMENT + "/login");

    page.locator('input[id="user"]').type(user.username);
    page.locator('input[id="password"]').type(user.password);
    page.locator('button[type="submit"]').click();

    page.waitForLoadState("networkidle");

    sleep(3);

    check(page, {
      "Login successful": (page) => page.content().indexOf("All files") !== -1,
    });
  } finally {
    page.close();
    browser.close();
  }
}
