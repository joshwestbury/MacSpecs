var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const html_to_json_1 = __importDefault(require("html-to-json"));
const lodash_1 = __importDefault(require("lodash"));
function getHTML(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: html } = yield axios_1.default.get("https://everymac.com/systems/apple/imac/specs/imac-core-i3-3.6-21-inch-aluminum-retina-4k-early-2019-specs.html");
        return html;
    });
}
exports.getHTML = getHTML;
function getImacSpecs(html) {
    return __awaiter(this, void 0, void 0, function* () {
        //load cheerio
        const $ = cheerio_1.default.load(html);
        const span = $("#contentcenter_specs_table");
        const data = span.html();
        const result = yield getSpecTitles(data);
        // get spec titles
        const x = result.imacTable;
        const imacSpecTitles = lodash_1.default.map(x, obj => obj.title.trim());
        //console.log(imacSpecTitles);
        const specs = yield getSpecData(data);
        const specData = specs.imacTable;
        const specArr = lodash_1.default.map(specData, obj => lodash_1.default.split(obj.data, "\n"));
        const trimArr = [];
        lodash_1.default.forEach(specArr, item => {
            for (var i = 0; i < item.length; i++) {
                trimArr.push(item[i].trim());
            }
        });
        const diffSpecs = lodash_1.default.difference(trimArr, imacSpecTitles);
        //const diffSpecs = _.map(trimArr, item => _.difference(item, imacSpecTitles));
        //console.log(diffSpecs);
        const imacSpecs = [];
        lodash_1.default.forEach(diffSpecs, arr => {
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                imacSpecs.push(arr[i].trim());
            }
        });
        //console.log(imacSpecs);
        const final = lodash_1.default.zipObject(imacSpecTitles, diffSpecs);
        return final;
    });
}
exports.getImacSpecs = getImacSpecs;
function getSpecTitles(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(data);
        const result = yield html_to_json_1.default.batch(data, {
            imacTable: html_to_json_1.default.createParser([
                ".mocklink",
                {
                    title: function ($section) {
                        const myResult = $section.text();
                        const final = myResult.trim();
                        return final;
                    }
                }
            ])
        });
        return result;
    });
}
function getSpecData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield html_to_json_1.default.batch(data, {
            imacTable: html_to_json_1.default.createParser([
                "#contentcenter_specs_table_pairs",
                {
                    data: function ($section) {
                        const myResult = $section.text();
                        const final = myResult.trim();
                        return final;
                    }
                }
            ])
        });
        return result;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyYXBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjcmFwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHNEQUE4QjtBQUM5QixnRUFBc0M7QUFDdEMsb0RBQXVCO0FBSXZCLGlCQUF1QixHQUFHOztRQUN4QixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FDcEMsaUhBQWlILENBQ2xILENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FBQTtBQTRFUSwwQkFBTztBQTFFaEIsc0JBQTRCLElBQUk7O1FBQzlCLGNBQWM7UUFDZCxNQUFNLENBQUMsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUU3QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDM0IsTUFBTSxjQUFjLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELDhCQUE4QjtRQUU5QixNQUFNLEtBQUssR0FBRyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLGdCQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLGdCQUFDLENBQUMsS0FB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