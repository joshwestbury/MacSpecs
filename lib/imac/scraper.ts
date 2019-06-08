import axios from "axios";
import cheerio from "cheerio";
import htmlToJson from "html-to-json";
import _ from "lodash";
import Papa from "papaparse";
import { Imac } from "../../types/imac";

async function getHTML(url) {
  const { data: html } = await axios.get(
    "https://everymac.com/systems/apple/imac/specs/imac-core-i3-3.6-21-inch-aluminum-retina-4k-early-2019-specs.html"
  );
  return html;
}

async function getImacSpecs(html): Promise<Imac> {
  //load cheerio
  const $ = cheerio.load(html);
  const span = $("#contentcenter_specs_table");

  const data = span.html();
  const result = await getSpecTitles(data);

  // get spec titles
  const x = result.imacTable;
  const imacSpecTitles = _.map(x, obj => obj.title.trim());
  //console.log(imacSpecTitles);

  const specs = await getSpecData(data);
  const specData = specs.imacTable;
  const specArr = _.map(specData, obj => _.split(obj.data, "\n"));
  const trimArr = [];
  _.forEach(specArr, item => {
    for (var i = 0; i < item.length; i++) {
      trimArr.push(item[i].trim());
    }
  });

  const diffSpecs = _.difference(trimArr, imacSpecTitles);
  //const diffSpecs = _.map(trimArr, item => _.difference(item, imacSpecTitles));
  //console.log(diffSpecs);

  const imacSpecs = [];
  _.forEach(diffSpecs, arr => {
    var length = arr.length;
    for (var i = 0; i < length; i++) {
      imacSpecs.push(arr[i].trim());
    }
  });
  //console.log(imacSpecs);

  const final: Imac = _.zipObject(imacSpecTitles, diffSpecs);
  return final;
}

async function getSpecTitles(data) {
  //console.log(data);

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
}

async function getSpecData(data) {
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
}

export { getHTML, getImacSpecs };
