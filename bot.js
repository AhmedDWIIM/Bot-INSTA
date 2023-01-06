const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = browser.newPage();

    await page.goto('https://www.instagram.com/');
    await page.waitForSelector('body', { timeout : 3000});
}

run();