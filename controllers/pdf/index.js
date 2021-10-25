const puppeteer = require("puppeteer");
var fs = require("fs");

async function printPDF(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log(url);
  await page.goto(url, { waitUntil: "load" });
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

module.exports = {
  pdfResponse: async function (ctx) {
    const data = {
      ...ctx.request.body,
    };
    const pdf = await printPDF(data.url);
    console.log(pdf);
    ctx.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    // ctx.set("X-Response-Time", `${1000}ms`);
    ctx.body = pdf;
  },
};
