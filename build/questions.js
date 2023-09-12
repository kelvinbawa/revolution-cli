var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import chalk from "chalk";
import inquirer from "inquirer";
import { countWords, readLocalFile, readRemoteFile } from "./utils/index.js";
var prompt = inquirer.createPromptModule();
export function questionInit() {
    var _this = this;
    var URL_QUETION = "Load file from a URL";
    var PATH_QUETION = "Load file from system";
    var SAMPLE_QUETION = "Count words from same file ".concat(chalk.dim("(input.txt)"));
    var questions = [
        {
            name: "location",
            type: "rawlist",
            choices: [SAMPLE_QUETION, PATH_QUETION, URL_QUETION],
            message: "Please select file location",
        },
        {
            name: "files",
            when: function (answers) {
                if (answers.location === SAMPLE_QUETION)
                    return false;
                return true;
            },
            message: function (answers) {
                if (answers.location === "Load file from a URL") {
                    return "Enter URL: ".concat(chalk.dim("(https://www.w3.org/TR/PNG/iso_8859-1.txt)"));
                }
                else if (answers.location === "Load file from system") {
                    return "Enter path: ".concat(chalk.dim("(../path/to/file/file.txt"));
                }
                return "Answer";
            },
            type: "input",
        },
    ];
    prompt(questions)
        .then(function (answers) { return __awaiter(_this, void 0, void 0, function () {
        var remote, count_1, remote, count_2, count_3, sampleFilePath, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(answers.location === URL_QUETION && answers.files === "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, readRemoteFile()];
                case 1:
                    remote = _a.sent();
                    count_1 = countWords(remote);
                    console.log(count_1);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 2:
                    if (!(answers.location === URL_QUETION && answers.files !== "")) return [3 /*break*/, 4];
                    return [4 /*yield*/, readRemoteFile(answers.files)];
                case 3:
                    remote = _a.sent();
                    count_2 = countWords(remote);
                    console.log(count_2);
                    process.exit(1);
                    _a.label = 4;
                case 4:
                    if (answers.location === PATH_QUETION && answers.files === "") {
                        console.log("file can't be empty");
                        return [2 /*return*/, false];
                    }
                    else if (answers.location === PATH_QUETION && answers.files !== "") {
                        count_3 = countWords(answers.files);
                        console.log("Total word count is:", count_3);
                        process.exit(1);
                    }
                    return [4 /*yield*/, readLocalFile("./input.txt")];
                case 5:
                    sampleFilePath = _a.sent();
                    count = countWords(sampleFilePath);
                    console.log("Total word count is:", count);
                    return [2 /*return*/];
            }
        });
    }); })
        .catch(function (error) {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        }
        else {
            // Something else went wrong
        }
    });
}
