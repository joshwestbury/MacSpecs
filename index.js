var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./lib/imac/scraper");
function getImacData() {
    return __awaiter(this, void 0, void 0, function* () {
        const html = yield scraper_1.getHTML("https://everymac.com/");
        scraper_1.getImacSpecs(html);
    });
}
getImacData();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxnREFBMkQ7QUFFM0Q7O1FBQ0UsTUFBTSxJQUFJLEdBQUcsTUFBTSxpQkFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDcEQsc0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQUE7QUFFRCxXQUFXLEVBQUUsQ0FBQyJ9