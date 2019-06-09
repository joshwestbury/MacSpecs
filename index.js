var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const getTechSpecs_1 = require("./getTechSpecs");
const urls = require("./macbook-urls.json");
function main() {
    getMacBookData(urls, "macbook");
    // getImacData();
    // getMacProData();
}
function getMacBookData(urls, dirName) {
    return __awaiter(this, void 0, void 0, function* () {
        _.forEach(urls, (macUrl) => __awaiter(this, void 0, void 0, function* () {
            const fileName = macUrl.url.slice(49, -5);
            yield getTechSpecs_1.getTechSpecs(macUrl.url, dirName, fileName);
        }));
    });
}
function getImacData() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function getMacProData() {
    return __awaiter(this, void 0, void 0, function* () { });
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRCO0FBQzVCLGlEQUE4QztBQUM5QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUU1QztJQUNFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEMsaUJBQWlCO0lBQ2pCLG1CQUFtQjtBQUNyQixDQUFDO0FBQ0Qsd0JBQThCLElBQUksRUFBRSxPQUFPOztRQUN6QyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFNLE1BQU0sRUFBQyxFQUFFO1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sMkJBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUFBO0FBRUQ7MERBQThCLENBQUM7Q0FBQTtBQUUvQjswREFBZ0MsQ0FBQztDQUFBO0FBRWpDLElBQUksRUFBRSxDQUFDIn0=