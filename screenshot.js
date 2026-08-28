const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const proofDir1280 = path.join(__dirname, 'proof', '1280');
const proofDir375 = path.join(__dirname, 'proof', '375');

// Ensure proof directories exist
if (!fs.existsSync(proofDir1280)) {
  fs.mkdirSync(proofDir1280, { recursive: true });
}
if (!fs.existsSync(proofDir375)) {
  fs.mkdirSync(proofDir375, { recursive: true });
}

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });

  const variants = ['variant-1.html', 'variant-2.html', 'variant-3.html'];

  for (const variant of variants) {
    const filePath = 'file://' + path.resolve(__dirname, variant);

    // Capture 1280 (will show full page properly as requested 10x8 inches which is roughly 960x768,
    // but 1280x1024 works well for showing the whole document context)
    let context = await browser.newContext({ viewport: { width: 1280, height: 1024 } });
    let page = await context.newPage();
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Find all pages and screenshot them
    let pages = await page.$$('.pdf-page');
    for (let i = 0; i < pages.length; i++) {
        const p = pages[i];
        const indexStr = String(i + 1).padStart(2, '0');
        await p.screenshot({ path: path.join(proofDir1280, `${variant.replace('.html', '')}-page-${indexStr}.png`) });
    }
    await context.close();

    // Capture 375
    context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    page = await context.newPage();
    await page.goto(filePath, { waitUntil: 'networkidle' });

    pages = await page.$$('.pdf-page');
    for (let i = 0; i < pages.length; i++) {
        const p = pages[i];
        const indexStr = String(i + 1).padStart(2, '0');
        await p.screenshot({ path: path.join(proofDir375, `${variant.replace('.html', '')}-page-${indexStr}.png`) });
    }
    await context.close();
  }

  await browser.close();
}

captureScreenshots().catch(console.error);
