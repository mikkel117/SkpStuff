import puppeteer from "puppeteer";
import { baseUrl, popular, movies } from "../../helper";

export default async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${baseUrl}films/${popular}`);
  /* let title = await page.evaluate(() => {
     return document.querySelector("#firstHeading").textContent.trim();
    headings_elements = document.querySelectorAll("h2 .mw-headline");
    headings_array = Array.from(headings_elements);
    return headings_array.map((heading) => heading.textContent);
  }); */

  let test = await page.evaluate(() => {
    return document.querySelector(".section-heading").textContent;
  });

  await browser.close();
  return res.status(200).json(test);
};
