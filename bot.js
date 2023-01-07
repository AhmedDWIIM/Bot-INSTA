const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    // Aller sur la page d'accueil d'Instagram
    await page.goto('https://www.instagram.com/');
    // Accepter les cookies
    await page.waitForSelector('button[class="_a9-- _a9_0"]');
    await page.click('button[class="_a9-- _a9_0"]');

    // Attente de l'affichage du formulaire de connexion
    await page.waitForSelector('form',{timeout:3000});
    // Saisie de l'identifiant
    await page.type('input[name=username]', process.env.INSTAGRAM_ID);
    // Saisie du mot de passe
    await page.type('input[name=password]', process.env.INSTAGRAM_PASSWORD);
    // Soumission du formulaire
    try {
        // Soumission du formulaire
        await page.click('button[class="_acan _aiit _acap _aijb _acas _aj1-"]');
      } catch (error) {
        console.error(error);
      }
}

run();
