const puppeteer = require("puppeteer");
var fs = require("fs");

async function printPDF(url) {
  const browser = await puppeteer.launch({
    headless: true,
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load" });
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log(2);
  //     resolve();
  //   }, 200);
  // });
  const pdf = await page.pdf({
    format: "A4",
    scale: 0.6,
    margin: { top: 0, bottom: 10, left: 25, right: 5 },
  });
  console.log(page.viewport());
  await browser.close();
  return pdf;
}

module.exports = {
  pdfResponse: async function (ctx) {
    const data = {
      ...ctx.request.body,
    };
    console.log(data);
    const pdf = await printPDF(data.url);
    // console.log(pdf);
    ctx.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    // ctx.set("X-Response-Time", `${1000}ms`);
    ctx.body = pdf;
  },
};
