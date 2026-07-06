const { chromium } = require('playwright');
const path = require('path');

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  await page.setViewportSize({ width: 375, height: 812 });
  
  await page.goto('http://localhost:3000/contact');
  await page.waitForTimeout(1000);
  
  const button = page.locator('button[aria-label="Open menu"]');
  await button.click();
  await page.waitForTimeout(1000);
  
  // Capture screenshot of the menu
  const screenshotPath = path.join(__dirname, 'menu-screenshot.png');
  await page.screenshot({ path: screenshotPath });
  console.log('Saved screenshot to:', screenshotPath);
  
  await browser.close();
}

check().catch(console.error);
