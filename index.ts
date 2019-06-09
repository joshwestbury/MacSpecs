import * as _ from "lodash";
import { getTechSpecs } from "./getTechSpecs";
const urls = require("./macbook-urls.json");

function main() {
  getMacBookData(urls, "macbook");
  // getImacData();
  // getMacProData();
}
async function getMacBookData(urls, dirName) {
  _.forEach(urls, async macUrl => {
    const fileName = macUrl.url.slice(49, -5);
    await getTechSpecs(macUrl.url, dirName, fileName);
  });
}

async function getImacData() {}

async function getMacProData() {}

main();
