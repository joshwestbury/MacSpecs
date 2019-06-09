import _ from "lodash";
import axios from "axios";
import cheerio from "cheerio";
import * as fs from "file-system";
import htmlToJson from "html-to-json";
import Papa from "papaparse";
import { Imac } from "./types/imac";

export async function getTechSpecs(url, dirName, fileName): Promise<void> {
  try {
    const { data: html } = await axios.get(url);

    //load cheerio
    const $ = cheerio.load(html);
    const span = $("#contentcenter_specs_table");

    const data = span.html();
    const result = await getSpecTitles(data);

    // get spec titles
    const x = result.imacTable;
    const specTitles = _.map(x, obj => obj.title.trim());

    const specs = await getSpecData(data);
    const specData = specs.imacTable;
    const specArr = _.map(specData, obj => _.split(obj.data, "\n"));
    const trimArr = [];
    _.forEach(specArr, item => {
      for (var i = 0; i < item.length; i++) {
        trimArr.push(item[i].trim());
      }
    });

    const diffSpecs = _.difference(trimArr, specTitles);

    const jsonData: Imac = _.zipObject(specTitles, diffSpecs);
    const techSpecs = [jsonData];

    writeJSON(techSpecs, dirName, fileName);
  } catch (err) {
    console.log(err);
  }
}

async function getSpecTitles(data) {
  try {
    const result = await htmlToJson.batch(data, {
      imacTable: htmlToJson.createParser([
        ".mocklink",
        {
          title: function($section) {
            const myResult = $section.text();
            const final = myResult.trim();
            return final;
          }
        }
      ])
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function getSpecData(data) {
  try {
    const result = await htmlToJson.batch(data, {
      imacTable: htmlToJson.createParser([
        "#contentcenter_specs_table_pairs",
        {
          data: function($section) {
            const myResult = $section.text();
            const final = myResult.trim();
            return final;
          }
        }
      ])
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

function writeJSON(techSpecs, dirName, fileName) {
  const strJSON = JSON.stringify(techSpecs);
  // Write spec data to csv
  fs.appendFile(
    `./JSON-DATA/${dirName}/tech-specs/${fileName}.json`,
    strJSON,
    "utf8",
    error => {
      if (error) {
        console.log("error");
      }
    }
  );
}
