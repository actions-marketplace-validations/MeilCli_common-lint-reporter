/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 5201:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JunitTransformer = void 0;
var core = __importStar(__webpack_require__(2225));
var xml = __importStar(__webpack_require__(6965));
var he = __importStar(__webpack_require__(6492));
var option_1 = __webpack_require__(9146);
var transformer_1 = __webpack_require__(6226);
var convert_1 = __webpack_require__(4018);
var JunitTransformer = /** @class */ (function (_super) {
    __extends(JunitTransformer, _super);
    function JunitTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JunitTransformer.prototype.parse = function (body) {
        var junitResult = xml.parse(body, {
            arrayMode: true,
            ignoreAttributes: false,
            attributeNamePrefix: "",
            parseAttributeValue: true,
            attrValueProcessor: function (value, _) { return he.decode(value); },
        });
        var junitTestSuites = [];
        if (junitResult.testsuites != undefined) {
            for (var _i = 0, _a = junitResult.testsuites; _i < _a.length; _i++) {
                var testSuites = _a[_i];
                junitTestSuites.push.apply(junitTestSuites, this.parseTestSuites(testSuites.testsuite));
            }
        }
        else {
            // for cpplint
            var testSuites = junitResult;
            if (testSuites.testsuite != undefined) {
                junitTestSuites.push.apply(junitTestSuites, this.parseTestSuites(testSuites.testsuite));
            }
        }
        return (0, convert_1.convertJunitToLintResult)(junitTestSuites);
    };
    JunitTransformer.prototype.parseTestSuites = function (testSuites) {
        if (testSuites == undefined) {
            return [];
        }
        var result = [];
        for (var _i = 0, testSuites_1 = testSuites; _i < testSuites_1.length; _i++) {
            var testSuite = testSuites_1[_i];
            result.push({
                name: testSuite.name,
                package: testSuite.package,
                testCases: this.parseTestCases(testSuite.testcase),
                testSuites: this.parseTestSuites(testSuite.testsuite),
            });
        }
        return result;
    };
    JunitTransformer.prototype.parseTestCases = function (testCases) {
        if (testCases == undefined) {
            return [];
        }
        var result = [];
        for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
            var testCase = testCases_1[_i];
            result.push({
                name: testCase.name,
                className: testCase.classname,
                failures: this.parseTestMessages(testCase.failure),
                errors: this.parseTestMessages(testCase.error),
            });
        }
        return result;
    };
    JunitTransformer.prototype.parseTestMessages = function (testMessages) {
        if (testMessages == undefined) {
            return [];
        }
        if (typeof testMessages == "string") {
            return [{ message: testMessages, body: testMessages }];
        }
        var result = [];
        for (var _i = 0, testMessages_1 = testMessages; _i < testMessages_1.length; _i++) {
            var testMessage = testMessages_1[_i];
            result.push({
                message: testMessage.message,
                body: he.decode(testMessage["#text"]),
            });
        }
        return result;
    };
    return JunitTransformer;
}(transformer_1.Transformer));
exports.JunitTransformer = JunitTransformer;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var option, transformer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    option = (0, option_1.getOption)();
                    transformer = new JunitTransformer();
                    return [4 /*yield*/, transformer.transform(option)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        core.setFailed(error_1.message);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
if (true) {
    run();
}


/***/ }),

/***/ 4018:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertJunitToLintResult = void 0;
var junit_handler_default_1 = __webpack_require__(2019);
var junit_handler_eslint_1 = __webpack_require__(4788);
var junit_handler_cpplint_1 = __webpack_require__(9850);
var junit_handler_rubocop_1 = __webpack_require__(3289);
var handlers = [
    new junit_handler_eslint_1.EslintJunitHandler(),
    new junit_handler_cpplint_1.CpplintJunitHandler(),
    new junit_handler_rubocop_1.RubocopJunitHandler(),
    new junit_handler_default_1.DefaultJunitHandler(),
];
function convertJunitToLintResult(testSuites) {
    for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
        var handler = handlers_1[_i];
        if (handler.match(testSuites)) {
            return handler.handle(testSuites);
        }
    }
    return [];
}
exports.convertJunitToLintResult = convertJunitToLintResult;


/***/ }),

/***/ 9850:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CpplintJunitHandler = void 0;
var he = __importStar(__webpack_require__(6492));
var CpplintJunitHandler = /** @class */ (function () {
    function CpplintJunitHandler() {
    }
    CpplintJunitHandler.prototype.match = function (testSuites) {
        if (testSuites.length == 0) {
            return false;
        }
        return testSuites[0].name == "cpplint";
    };
    CpplintJunitHandler.prototype.handle = function (testSuites) {
        var result = [];
        this.handleTestSuites(result, testSuites);
        return result;
    };
    CpplintJunitHandler.prototype.handleTestSuites = function (result, testSuites) {
        for (var _i = 0, testSuites_1 = testSuites; _i < testSuites_1.length; _i++) {
            var testSuite = testSuites_1[_i];
            this.handleTestSuite(result, testSuite);
        }
    };
    CpplintJunitHandler.prototype.handleTestSuite = function (result, testSuite) {
        this.handleTestCases(result, testSuite.testCases);
        this.handleTestSuites(result, testSuite.testSuites);
    };
    CpplintJunitHandler.prototype.handleTestCases = function (result, testCases) {
        for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
            var testCase = testCases_1[_i];
            this.handleTestCase(result, testCase);
        }
    };
    CpplintJunitHandler.prototype.handleTestCase = function (result, testCase) {
        for (var _i = 0, _a = testCase.failures; _i < _a.length; _i++) {
            var failure = _a[_i];
            for (var _b = 0, _c = this.parseBody(failure.body); _b < _c.length; _b++) {
                var message = _c[_b];
                result.push({
                    path: testCase.name,
                    message: message[1],
                    level: message[3] == 5 ? "failure" : 3 <= message[3] ? "warning" : "notice",
                    rule: message[2],
                    startLine: message[0],
                    startColumn: undefined,
                    endLine: undefined,
                    endColumn: undefined,
                });
            }
        }
        for (var _d = 0, _e = testCase.errors; _d < _e.length; _d++) {
            var error = _e[_d];
            for (var _f = 0, _g = this.parseBody(error.body); _f < _g.length; _f++) {
                var message = _g[_f];
                result.push({
                    path: testCase.name,
                    message: message[1],
                    level: message[3] == 5 ? "failure" : 3 <= message[3] ? "warning" : "notice",
                    rule: message[2],
                    startLine: message[0],
                    startColumn: undefined,
                    endLine: undefined,
                    endColumn: undefined,
                });
            }
        }
    };
    CpplintJunitHandler.prototype.parseBody = function (body) {
        var result = [];
        for (var _i = 0, _a = body.split(/(\r\n)|\n|\r/g); _i < _a.length; _i++) {
            var line = _a[_i];
            if (line == undefined || line.length == 0) {
                continue;
            }
            var rawStartLine = line.replace(/^(\d+):\s(.+)\s\[(.+?)\]\s\[(\d)\]$/, "$1");
            var rawMessage = line.replace(/^(\d+):\s(.+)\s\[(.+?)\]\s\[(\d)\]$/, "$2");
            var rawRule = line.replace(/^(\d+):\s(.+)\s\[(.+?)\]\s\[(\d)\]$/, "$3");
            var rawConfidence = line.replace(/^(\d+):\s(.+)\s\[(.+?)\]\s\[(\d)\]$/, "$4");
            if (rawStartLine.length == 0 ||
                rawMessage.length == 0 ||
                rawRule.length == 0 ||
                rawConfidence.length == 0) {
                continue;
            }
            var startLine = parseInt(rawStartLine);
            var message = he.decode(rawMessage);
            var rule = he.decode(rawRule);
            var confidence = parseInt(rawConfidence);
            if (Number.isInteger(startLine) == false || Number.isInteger(confidence) == false) {
                continue;
            }
            result.push([startLine == 0 ? 1 : startLine, message, rule, confidence]);
        }
        return result;
    };
    return CpplintJunitHandler;
}());
exports.CpplintJunitHandler = CpplintJunitHandler;


/***/ }),

/***/ 2019:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultJunitHandler = void 0;
var DefaultJunitHandler = /** @class */ (function () {
    function DefaultJunitHandler() {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DefaultJunitHandler.prototype.match = function (testSuites) {
        return true;
    };
    DefaultJunitHandler.prototype.handle = function (testSuites) {
        var result = [];
        this.handleTestSuites(result, testSuites);
        return result;
    };
    DefaultJunitHandler.prototype.handleTestSuites = function (result, testSuites) {
        for (var _i = 0, testSuites_1 = testSuites; _i < testSuites_1.length; _i++) {
            var testSuite = testSuites_1[_i];
            this.handleTestSuite(result, testSuite);
        }
    };
    DefaultJunitHandler.prototype.handleTestSuite = function (result, testSuite) {
        this.handleTestCases(result, testSuite.testCases);
        this.handleTestSuites(result, testSuite.testSuites);
    };
    DefaultJunitHandler.prototype.handleTestCases = function (result, testCases) {
        for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
            var testCase = testCases_1[_i];
            this.handleTestCase(result, testCase);
        }
    };
    DefaultJunitHandler.prototype.handleTestCase = function (result, testCase) {
        for (var _i = 0, _a = testCase.failures; _i < _a.length; _i++) {
            var failure = _a[_i];
            result.push({
                path: testCase.className,
                message: failure.message,
                level: "failure",
                rule: testCase.name,
                startLine: undefined,
                startColumn: undefined,
                endLine: undefined,
                endColumn: undefined,
            });
        }
        for (var _b = 0, _c = testCase.errors; _b < _c.length; _b++) {
            var error = _c[_b];
            result.push({
                path: testCase.className,
                message: error.message,
                level: "warning",
                rule: testCase.name,
                startLine: undefined,
                startColumn: undefined,
                endLine: undefined,
                endColumn: undefined,
            });
        }
    };
    return DefaultJunitHandler;
}());
exports.DefaultJunitHandler = DefaultJunitHandler;


/***/ }),

/***/ 4788:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EslintJunitHandler = void 0;
var EslintJunitHandler = /** @class */ (function () {
    function EslintJunitHandler() {
    }
    EslintJunitHandler.prototype.match = function (testSuites) {
        if (testSuites.length == 0) {
            return false;
        }
        return testSuites[0].package == "org.eslint";
    };
    EslintJunitHandler.prototype.handle = function (testSuites) {
        var result = [];
        this.handleTestSuites(result, testSuites);
        return result;
    };
    EslintJunitHandler.prototype.handleTestSuites = function (result, testSuites) {
        for (var _i = 0, testSuites_1 = testSuites; _i < testSuites_1.length; _i++) {
            var testSuite = testSuites_1[_i];
            this.handleTestSuite(result, testSuite);
        }
    };
    EslintJunitHandler.prototype.handleTestSuite = function (result, testSuite) {
        this.handleTestCases(result, testSuite.testCases, testSuite);
        this.handleTestSuites(result, testSuite.testSuites);
    };
    EslintJunitHandler.prototype.handleTestCases = function (result, testCases, testSuite) {
        for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
            var testCase = testCases_1[_i];
            this.handleTestCase(result, testCase, testSuite);
        }
    };
    EslintJunitHandler.prototype.handleTestCase = function (result, testCase, testSuite) {
        // ref: https://github.com/eslint/eslint/blob/master/lib/cli-engine/formatters/junit.js
        for (var _i = 0, _a = testCase.failures; _i < _a.length; _i++) {
            var failure = _a[_i];
            result.push({
                path: testSuite.name,
                message: failure.message,
                level: "warning",
                rule: testCase.name.slice("org.eslint.".length),
                startLine: this.findLine(failure),
                startColumn: undefined,
                endLine: undefined,
                endColumn: undefined,
            });
        }
        for (var _b = 0, _c = testCase.errors; _b < _c.length; _b++) {
            var error = _c[_b];
            result.push({
                path: testSuite.name,
                message: error.message,
                level: "failure",
                rule: testCase.name.slice("org.eslint.".length),
                startLine: this.findLine(error),
                startColumn: undefined,
                endLine: undefined,
                endColumn: undefined,
            });
        }
    };
    EslintJunitHandler.prototype.findLine = function (message) {
        var targetLength = "line ".length;
        var index = message.body.indexOf("line ");
        if (index < 0) {
            return 0;
        }
        var lastIndex = message.body.indexOf(" ", index + targetLength);
        if (lastIndex < 0) {
            return 0;
        }
        var lineText = message.body.slice(index + targetLength, lastIndex);
        var line = parseInt(lineText);
        if (Number.isInteger(line)) {
            return line;
        }
        return 0;
    };
    return EslintJunitHandler;
}());
exports.EslintJunitHandler = EslintJunitHandler;


/***/ }),

/***/ 3289:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RubocopJunitHandler = void 0;
var RubocopJunitHandler = /** @class */ (function () {
    function RubocopJunitHandler() {
    }
    RubocopJunitHandler.prototype.match = function (testSuites) {
        if (testSuites.length == 0) {
            return false;
        }
        return testSuites[0].name == "rubocop";
    };
    RubocopJunitHandler.prototype.handle = function (testSuites) {
        var result = [];
        this.handleTestSuites(result, testSuites);
        return result;
    };
    RubocopJunitHandler.prototype.handleTestSuites = function (result, testSuites) {
        for (var _i = 0, testSuites_1 = testSuites; _i < testSuites_1.length; _i++) {
            var testSuite = testSuites_1[_i];
            this.handleTestSuite(result, testSuite);
        }
    };
    RubocopJunitHandler.prototype.handleTestSuite = function (result, testSuite) {
        this.handleTestCases(result, testSuite.testCases);
        this.handleTestSuites(result, testSuite.testSuites);
    };
    RubocopJunitHandler.prototype.handleTestCases = function (result, testCases) {
        for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
            var testCase = testCases_1[_i];
            this.handleTestCase(result, testCase);
        }
    };
    RubocopJunitHandler.prototype.handleTestCase = function (result, testCase) {
        for (var _i = 0, _a = testCase.failures; _i < _a.length; _i++) {
            var failure = _a[_i];
            var pathAndLine = this.findPathAndLine(failure);
            result.push({
                path: pathAndLine[0],
                message: this.findMessage(testCase, failure),
                level: "warning",
                rule: testCase.name,
                startLine: pathAndLine[1],
                startColumn: undefined,
                endLine: undefined,
                endColumn: undefined,
            });
        }
        for (var _b = 0, _c = testCase.errors; _b < _c.length; _b++) {
            var error = _c[_b];
            var pathAndLine = this.findPathAndLine(error);
            result.push({
                path: pathAndLine[0],
                message: this.findMessage(testCase, error),
                level: "failure",
                rule: testCase.name,
                startLine: pathAndLine[1],
                startColumn: undefined,
                endLine: undefined,
                endColumn: undefined,
            });
        }
    };
    RubocopJunitHandler.prototype.findMessage = function (testCase, message) {
        var searchTarget = "".concat(testCase.name, ": ");
        var ruleIndex = message.message.indexOf(searchTarget);
        if (ruleIndex < 0) {
            return "";
        }
        return message.message.slice(ruleIndex + searchTarget.length);
    };
    RubocopJunitHandler.prototype.findPathAndLine = function (message) {
        var body = message.body.trim();
        var path = body.replace(/^(.+):(\d+):(\d+)$/, "$1");
        var line = parseInt(body.replace(/^(.+):(\d+):(\d+)$/, "$2"));
        if (Number.isInteger(line)) {
            return [path, line];
        }
        return [path, 1];
    };
    return RubocopJunitHandler;
}());
exports.RubocopJunitHandler = RubocopJunitHandler;


/***/ }),

/***/ 9146:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOption = void 0;
var core = __importStar(__webpack_require__(2225));
function getOption() {
    return {
        reportFiles: getInput("report_files"),
        reportFilesFollowSymbolicLinks: getInputOrNull("report_files_follow_symbolic_links") == "true",
        outputPath: getInput("output_path"),
    };
}
exports.getOption = getOption;
function getInput(key) {
    return core.getInput(key, { required: true });
}
function getInputOrNull(key) {
    var result = core.getInput(key, { required: false });
    if (result.length == 0) {
        return null;
    }
    return result;
}


/***/ }),

/***/ 6226:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transformer = void 0;
var fs = __importStar(__webpack_require__(7147));
var glob = __importStar(__webpack_require__(5826));
var Transformer = /** @class */ (function () {
    function Transformer() {
    }
    Transformer.prototype.transform = function (option) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var globber, result, _b, _c, path, lintResults, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, glob.create(option.reportFiles, {
                            followSymbolicLinks: option.reportFilesFollowSymbolicLinks,
                        })];
                    case 1:
                        globber = _d.sent();
                        result = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        _b = __asyncValues(globber.globGenerator());
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 6];
                        path = _c.value;
                        lintResults = this.parse(fs.readFileSync(path, "utf-8"));
                        result.push.apply(result, lintResults);
                        _d.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_b)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13:
                        this.writeFile(option.outputPath, result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Transformer.prototype.writeFile = function (path, lintResults) {
        fs.writeFileSync(path, JSON.stringify(lintResults));
    };
    return Transformer;
}());
exports.Transformer = Transformer;


/***/ }),

/***/ 9491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 2781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [736], () => (__webpack_require__(5201)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + "vendor" + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 166;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			166: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e(736);
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;