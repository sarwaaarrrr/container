import puppeteer from "puppeteer";

export async function DAT() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 0, height: 0 });

    // Set a default navigation timeout
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    // Navigate to the login page
    await page.goto("https://one.dat.com/search-loads-ow");

    // Log in
    await page.waitForSelector("#mat-input-1");
    console.log("Logging in...");
    await page.type("#mat-input-1", "wmbcarriers@gmail.com");
    await page.type("#mat-input-0", "Trucking2023!");
    await page.click("#submit-button");
    console.log("Logged in successfully");

    // Continuously check for the popup visibility and handle it
    await continuouslyCheckPopupVisibility(page);
  } catch (error) {
    console.error("Error during login:", error);
  }
}

async function continuouslyCheckPopupVisibility(page) {
  while (true) {
    const popupVisible = await checkPopupVisibility(page);

    // Perform actions based on popup visibility
    if (!popupVisible) {
      // Handle the case when the popup is found and closed
      console.log("Popup is closed in the DAT module.");
    } else {
      // Handle the case when the popup is not visible
      console.log("Popup is not visible in the DAT module.");
    }

    // Wait for a short interval before checking again
    await page.waitForTimeout(1000); // Check every 1 second
  }
}

async function checkPopupVisibility(page) {
  try {
    const overlayVisible = await page.evaluate(() => {
      const overlayBackdrop = document.querySelector(
        ".cdk-overlay-backdrop.cdk-overlay-dark-backdrop.cdk-overlay-backdrop-showing"
      );
      const globalOverlayWrapper = document.querySelector(
        ".cdk-global-overlay-wrapper"
      );

      if (overlayBackdrop || globalOverlayWrapper) {
        overlayBackdrop.remove();
        globalOverlayWrapper.remove();
        return true;
      } else {
        return false; // Reset the flag when the popup is not found
      }
    });

    return overlayVisible;
  } catch (error) {
    console.error("Error checking popup visibility:", error);
    return false; // Keep the flag as false in case of an error
  }
}
