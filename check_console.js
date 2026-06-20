const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message, '\n', error.stack));
    await page.goto('https://techynews.lat', { waitUntil: 'networkidle0' });
    await browser.close();
})();
