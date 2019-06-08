import { getHTML, getImacSpecs } from "./lib/imac/scraper";

async function getImacData() {
  const html = await getHTML("https://everymac.com/");
  getImacSpecs(html);
}

getImacData();
