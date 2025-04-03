const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log("🔹 Memulai script...");

    // Membaca kredensial dari file
    const dataPath = path.join(__dirname, 'data.txt');
    console.log(`📂 Membaca kredensial dari: ${dataPath}`);

    const credentials = fs.readFileSync(dataPath, 'utf-8').trim().split('\n');
    const username = credentials[0];
    const password = credentials[1];

    console.log("✅ Kredensial berhasil dibaca!");

    // Meluncurkan browser Puppeteer
    console.log("🖥️  Meluncurkan browser...");
    const browser = await puppeteer.launch({
        headless: false,  // Ubah ke false jika ingin melihat browser
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    console.log("🌍 Membuka halaman login...");
    await page.goto('https://app.sogni.ai/');

    console.log("🔹 Menunggu tombol login...");
    await page.waitForSelector('body > div._backdrop_1y9op_1 > div > div > div._contentPanel_15qkp_1 > div._formFooter_15qkp_61 > button._button_1a2p7_1._variant-default_1a2p7_41._size-md_1a2p7_90._fullWidth_1a2p7_23');
    await page.click('body > div._backdrop_1y9op_1 > div > div > div._contentPanel_15qkp_1 > div._formFooter_15qkp_61 > button._button_1a2p7_1._variant-default_1a2p7_41._size-md_1a2p7_90._fullWidth_1a2p7_23');

    console.log("🔹 Mengisi form login...");
    await page.waitForSelector('#element-1');
    console.log("✏️  Memasukkan username...");
    await page.type('#element-1', username);

    await page.waitForSelector('#element-2');
    console.log("✏️  Memasukkan password...");
    await page.type('#element-2', password);

    console.log("🔹 Klik tombol Submit...");
    await page.waitForSelector('body > div._backdrop_1y9op_1 > div > div > form > div._formFooter_15qkp_61 > button._button_1a2p7_1._variant-primary_1a2p7_52._size-md_1a2p7_90._fullWidth_1a2p7_23');
    await page.click('body > div._backdrop_1y9op_1 > div > div > form > div._formFooter_15qkp_61 > button._button_1a2p7_1._variant-primary_1a2p7_52._size-md_1a2p7_90._fullWidth_1a2p7_23');

    console.log("⏳ Menunggu proses login...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("🔹 Navigasi ke halaman utama...");
    await page.waitForSelector('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(4) > div > button:nth-child(4)');
    await page.click('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(4) > div > button:nth-child(4)');

    console.log("✅ Login berhasil!");

    // Meluncurkan browser Puppeteer
    console.log("🔹 Memilih MODELS AI");
    await page.waitForSelector('#root > div > nav > div._scrollContainer_lnd69_60 > div:nth-child(2) > a > span._icon_lnd69_100');
    await page.click('#root > div > nav > div._scrollContainer_lnd69_60 > div:nth-child(2) > a > span._icon_lnd69_100');

    await page.waitForSelector('#root > div > div._modelExplorer_1qrxp_1 > div._modelBrowser_1qrxp_100 > ul > li:nth-child(2) > ul > li:nth-child(6) > div')
    await page.click('#root > div > div._modelExplorer_1qrxp_1 > div._modelBrowser_1qrxp_100 > ul > li:nth-child(2) > ul > li:nth-child(6) > div')
  
    await page.waitForSelector('#root > div > div._modelExplorer_1qrxp_1 > div._modelPreview_1qrxp_12 > ul > li:nth-child(1) > button')
    await page.click('#root > div > div._modelExplorer_1qrxp_1 > div._modelPreview_1qrxp_12 > ul > li:nth-child(1) > button')

  
    // Loop untuk generate gambar
    while (true) {
        console.log("⏳ Menunggu 30 detik sebelum Generate Ulang...");
        for (let i = 30; i > 0; i--) {
            process.stdout.write(`\r⏳ Hitungan mundur: ${i} detik `);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log("\n🖼️  Generate Image...");
        await page.waitForSelector('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(2) > button');
        await page.click('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(2) > button');

        console.log("🔄 Mengulangi proses...");
    }
})();
