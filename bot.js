const puppeteer = require('puppeteer');
//const ObjectsToCsv = require('objects-to-csv');
//const { Cluster } = require('puppeteer-cluster');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
    const browser = await puppeteer.launch({
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials'
        ],
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
    //const csrfToken = await page.$eval('input[name=_csrf]', input => input.value);

    await page.waitForSelector('button[type=submit]');

     // Trouve tous les boutons sur la page
    const buttons = await page.$$('button[type=submit]');

  // Pour chaque bouton, clique dessus
    for (let button of buttons) {
        await button.click();
    }
    
    
}

run();
