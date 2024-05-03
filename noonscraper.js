const puppeteer = require("puppeteer");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function scrapeWebsite(pageLimit) {
  console.log("Scraping website...");
  const browser = await puppeteer.launch({ headless: true });
  const csvWriter = createCsvWriter({
    path: "out.csv",
    header: [
      { id: "title", title: "Title" },
      { id: "desc", title: "Description" },
      { id: "cat", title: "Category" },
      { id: "ben", title: "Benefits" },
      { id: "eli", title: "Eligibility" },
      { id: "proc", title: "Procedure" },
      { id: "doc", title: "Documents" },
      { id: "link", title: "Link" },
    ],
  });
  console.log("Browser opened...");
  const page = await browser.newPage();
  await page.goto(`https://www.myscheme.gov.in/search`, {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  for (let i = 1; i <= pageLimit; i++) {
    console.log(`Scraping page ${i}...`);

    const data = await page.$$eval(
      ".mx-auto.rounded-xl.shadow-md.overflow-hidden.w-full.group",
      (elements) =>
        elements.map((item) => {
          const link = item.querySelector(
            "a.undefined.block.mt-1.text-xl.leading-tight.font-semibold.text-secondary"
          ).href;
          return {
            link: link,
          };
        })
    );
    const fulldata=[];
    for (let j = 0; j < data.length; j++) {
      // console.log(`Visiting link ${j + 1}...`);
      // const link = data[j].link;
      // const newPage = await browser.newPage();
      // await newPage.goto(link, { waitUntil: "networkidle0", timeout: 0 });
      // // Perform actions on the individual page
      // const title = await newPage.$eval(
      //   "h1.font-bold.text-green-600.text-xl",
      //   (element) => element.innerText
      // );
      // const cat= await newPage.$eval(
      //   "h2.text-darkIndigo-900.text-sm",
      //   (element) => element.innerHTML
      // );
      // const desc = await newPage.$$eval(
      //   "#details > div> div> div ",
      //   (elements) =>
      //     elements.map((element) => element.innerText)
      // );
      // const ben = await newPage.$$eval(
      //   "#benefits > div> div> div ",
      //   (elements) =>
      //     elements.map((element) => element.innerText)
      // );
      // const eli = await newPage.$$eval(
      //   "#eligibility > div> div> div ",
      //   (elements) =>
      //     elements.map((element) => element.innerText)
      // );
      // const proc = await newPage.$$eval(
      //   "#application-process > div> div> div ",
      //   (elements) =>
      //     elements.map((element) => element.innerText)
      // );
      // const doc = await newPage.$$eval(
      //   "#documents-required > div> div> div ",
      //   (elements) =>
      //     elements.map((element) => element.innerText)
      // );
      // const pageData= {
      //   title: title,
      //   cat: cat,
      //   desc: desc[0],
      //   ben: ben[0],
      //   eli: eli[0],
      //   proc: proc[0],
      //   doc: doc[0],
      //   link: data[j].link,
      // }
      // console.log(pageData);
      // fulldata.push(pageData);
      // await newPage.close();
    }
    // Write the records to the CSV file
    await csvWriter.writeRecords(fulldata);
    console.log("Page scraped...");

    // Click the next button
    await page.evaluate(() => {
      const elements = document.querySelectorAll("ul.list-none.flex.flex-wrap.items-center.justify-center");
      const lastElement = Array.from(elements).pop();
      const svg = lastElement.querySelector("svg:last-of-type");
      if (svg) svg.click();
    });
    // Click the next button
    
    // await page.evaluate((
    //   'ul.list-none.flex.flex-wrap.items-center.justify-center:last-child',
      
    // ) => {
    //   const nextPageButton = page.querySelector(
    //     'ul.list-none.flex.flex-wrap.items-center.justify-center:last-child' // Replace 'aria-label' with the actual attribute used for the next button in your case
    //   );
    //   console.log(nextPageButton, "nextPageButton")
    //   if (nextPageButton) nextPageButton.click();
    // });

    pointer[0].click();
    console.log(pointer,"pointer");
  }
  
  console.log("...Done");
  await browser.close();
}

scrapeWebsite(20);
