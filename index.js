const { remote } = require("webdriverio");
const fs = require("fs");

const initializeBrowser = async () => {
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
    logLevel: "silent",
  });
  return browser;
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let count = 0;

const crawl = async (url) => {
  try {
    count++;
    console.log(count);
    const browser = await initializeBrowser();
    await browser.url(url);
    await sleep(5000);
    const humanBtn = await browser.$("#btn-main");
    await humanBtn.click();
    await sleep(8000);
    const getLinkBtn = await browser.$("#btn-main");
    const c = await browser.getWindowHandles();
    await sleep(2000);
    await browser.switchToWindow(c[0]);
    await getLinkBtn.click();
    await sleep(15000);
    await browser.deleteSession();
  } catch (err) {
    console.log(err);
    await browser.deleteSession();
  }
};

links = [
  "https://ouo.io/SqElJ3",
  "https://ouo.io/ngwHP5",
  "https://ouo.io/2rCRMbA",
  "https://ouo.io/MsTIEt",
  "https://ouo.io/SW1vyO",
];

const main = async (links) => {
  while (true) {
    for (let index in links) {
      await crawl(links[index]);
    }
  }
};

main(links);

/// 3:15am
