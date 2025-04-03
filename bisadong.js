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
        headless: true,  // Ubah ke false jika ingin melihat browser
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    console.log("🌍 Membuka halaman login...");
    await page.goto('https://app.sogni.ai/');

    console.log("🔹 Menunggu tombol login...");
    await page.waitForSelector('body > div._backdrop_1y9op_1 > div > div > div._contentPanel_jdxql_74 > div._formFooter_jdxql_116 > button._button_1a2p7_1._variant-default_1a2p7_41._size-md_1a2p7_90._fullWidth_1a2p7_23');
    await page.click('body > div._backdrop_1y9op_1 > div > div > div._contentPanel_jdxql_74 > div._formFooter_jdxql_116 > button._button_1a2p7_1._variant-default_1a2p7_41._size-md_1a2p7_90._fullWidth_1a2p7_23');

    console.log("🔹 Mengisi form login...");
    await page.waitForSelector('#element-1');
    console.log("✏️  Memasukkan username...");
    await page.type('#element-1', username);

    await page.waitForSelector('#element-2');
    console.log("✏️  Memasukkan password...");
    await page.type('#element-2', password);

    console.log("🔹 Klik tombol Submit...");
    await page.waitForSelector('body > div._backdrop_1y9op_1 > div > div > form > div._formFooter_jdxql_116 > button._button_1a2p7_1._variant-primary_1a2p7_52._size-md_1a2p7_90._fullWidth_1a2p7_23');
    await page.click('body > div._backdrop_1y9op_1 > div > div > form > div._formFooter_jdxql_116 > button._button_1a2p7_1._variant-primary_1a2p7_52._size-md_1a2p7_90._fullWidth_1a2p7_23');

    console.log("⏳ Menunggu proses login...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("🔹 Navigasi ke halaman utama...");
    await page.waitForSelector('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(4) > div > button:nth-child(4)');
    await page.click('#root > div > div._creatorPage_9yeqj_1 > aside > div:nth-child(4) > div > button:nth-child(4)');

    console.log("✅ Login berhasil!");

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
