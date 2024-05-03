const puppeteer = require("puppeteer");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function scrapeWebsite(pageLimit) {
  console.log("Scraping website...");
  const browser = await puppeteer.launch({ headless: false });
  const csvWriter = createCsvWriter({
    path: "out.csv",
    header: [
      { id: "title", title: "Title" },
      { id: "desc", title: "Description" },
      { id: "cat", title: "Category" },
      { id: "ben", title: "Benefits" },
      { id: "elg", title: "Eligibility" },
      { id:"doc", title: "Documents"},
      { id: "proc", title: "Process" },
      { id: "link", title: "Link" },
    ],
  });
  console.log("Browser opened...")
  const page = await browser.newPage();
  await page.goto(
    `https://www.myscheme.gov.in/search`,
    { waitUntil: "networkidle0",timeout:0 }
  );
  
  // const data = await page.$$eval("h2.tracking-wide.text-sm.text-darkIndigo-900.font-normal");
  // console.log("data",data)
  // console.log("Browser loaded...")
  // for (let i = 1; i <= pageLimit; i++) {
  //   console.log(`Scraping page ${i}...`);
    

  //   // const data = await page.$$eval("h2.tracking-wide.text-sm.text-darkIndigo-900.font-normal", (elements) =>
  //   //   console.log("elements",elements)
  //   //   // elements.map((item) => {
  //   //   //   console.log("item",item);
  //   //   //   return {
  //   //   //     text: "acb",//item.querySelector(".jyQuMr").title,
  //   //   //     link: "dec",//item.querySelector(".dvQhRS>a").href,
  //   //   //     mrp: "wad",//item.querySelector(".oldPrice")?.textContent ?? "N/A",
  //   //   //     sp: "wdawa",//item.querySelector(".hCDaLm>strong").textContent,
  //   //   //   };
  //   //   // })
  //   // );

  //   // Write the records to the CSV file
  //   // await csvWriter.writeRecords(data);
  //   // console.log("Page scraped...");
  //   // await page.close();
  // }


  console.log("...Done");
  await browser.close();
}

scrapeWebsite(208);
