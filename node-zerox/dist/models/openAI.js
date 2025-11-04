"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var axios_1 = __importDefault(require("axios"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var OpenAIModel = /** @class */ (function () {
    function OpenAIModel(credentials, model, llmParams) {
        this.apiKey = credentials.apiKey;
        this.model = model;
        this.llmParams = llmParams;
    }
    OpenAIModel.prototype.getCompletion = function (mode, params) {
        return __awaiter(this, void 0, void 0, function () {
            var modeHandlers, handler;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        modeHandlers = (_a = {},
                            _a[types_1.OperationMode.EXTRACTION] = function () {
                                return _this.handleExtraction(params);
                            },
                            _a[types_1.OperationMode.OCR] = function () { return _this.handleOCR(params); },
                            _a);
                        handler = modeHandlers[mode];
                        if (!handler) {
                            throw new Error("Unsupported operation mode: ".concat(mode));
                        }
                        return [4 /*yield*/, handler()];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    OpenAIModel.prototype.createMessageContent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var input = _b.input, options = _b.options;
            return __generator(this, function (_c) {
                if (Array.isArray(input)) {
                    return [2 /*return*/, Promise.all(input.map(function (imagePath) { return __awaiter(_this, void 0, void 0, function () {
                            var imageBuffer, correctedBuffer;
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0: return [4 /*yield*/, fs_extra_1.default.readFile(imagePath)];
                                    case 1:
                                        imageBuffer = _d.sent();
                                        return [4 /*yield*/, (0, utils_1.cleanupImage)({
                                                correctOrientation: (_a = options === null || options === void 0 ? void 0 : options.correctOrientation) !== null && _a !== void 0 ? _a : false,
                                                imageBuffer: imageBuffer,
                                                scheduler: (_b = options === null || options === void 0 ? void 0 : options.scheduler) !== null && _b !== void 0 ? _b : null,
                                                trimEdges: (_c = options === null || options === void 0 ? void 0 : options.trimEdges) !== null && _c !== void 0 ? _c : false,
                                            })];
                                    case 2:
                                        correctedBuffer = _d.sent();
                                        return [2 /*return*/, {
                                                image_url: {
                                                    url: "data:image/png;base64,".concat((0, utils_1.encodeImageToBase64)(correctedBuffer)),
                                                },
                                                type: "image_url",
                                            }];
                                }
                            });
                        }); }))];
                }
                return [2 /*return*/, [{ text: input, type: "text" }]];
            });
        });
    };
    OpenAIModel.prototype.handleOCR = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var systemPrompt, messages, base64Image, response, data, err_1;
            var _c;
            var image = _b.image, maintainFormat = _b.maintainFormat, priorPage = _b.priorPage, prompt = _b.prompt;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        systemPrompt = prompt || constants_1.SYSTEM_PROMPT_BASE;
                        messages = [{ role: "system", content: systemPrompt }];
                        // If content has already been generated, add it to context.
                        // This helps maintain the same format across pages
                        if (maintainFormat && priorPage && priorPage.length) {
                            messages.push({
                                role: "system",
                                content: (0, constants_1.CONSISTENCY_PROMPT)(priorPage),
                            });
                        }
                        return [4 /*yield*/, (0, utils_1.encodeImageToBase64)(image)];
                    case 1:
                        base64Image = _d.sent();
                        messages.push({
                            role: "user",
                            content: [
                                {
                                    type: "image_url",
                                    image_url: { url: "data:image/png;base64,".concat(base64Image) },
                                },
                            ],
                        });
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.post("https://openrouter.ai/api/v1/chat/completions", __assign({ messages: messages, model: this.model }, (0, utils_1.convertKeysToSnakeCase)((_c = this.llmParams) !== null && _c !== void 0 ? _c : null)), {
                                headers: {
                                    Authorization: "Bearer ".concat(this.apiKey),
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 3:
                        response = _d.sent();
                        data = response.data;
                        return [2 /*return*/, {
                                content: data.choices[0].message.content,
                                inputTokens: data.usage.prompt_tokens,
                                outputTokens: data.usage.completion_tokens,
                            }];
                    case 4:
                        err_1 = _d.sent();
                        console.error("Error in OpenAI completion", err_1);
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OpenAIModel.prototype.handleExtraction = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var messages, _c, _d, response, data, err_2;
            var _e;
            var _f;
            var input = _b.input, options = _b.options, prompt = _b.prompt, schema = _b.schema;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 3, , 4]);
                        messages = [];
                        if (prompt) {
                            messages.push({ role: "system", content: prompt });
                        }
                        _d = (_c = messages).push;
                        _e = {
                            role: "user"
                        };
                        return [4 /*yield*/, this.createMessageContent({ input: input, options: options })];
                    case 1:
                        _d.apply(_c, [(_e.content = _g.sent(),
                                _e)]);
                        return [4 /*yield*/, axios_1.default.post("https://openrouter.ai/api/v1/chat/completions", __assign({ messages: messages, model: this.model, response_format: {
                                    json_schema: { name: "extraction", schema: schema },
                                    type: "json_schema",
                                } }, (0, utils_1.convertKeysToSnakeCase)((_f = this.llmParams) !== null && _f !== void 0 ? _f : null)), {
                                headers: {
                                    Authorization: "Bearer ".concat(this.apiKey),
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 2:
                        response = _g.sent();
                        data = response.data;
                        return [2 /*return*/, {
                                extracted: data.choices[0].message.content,
                                inputTokens: data.usage.prompt_tokens,
                                outputTokens: data.usage.completion_tokens,
                            }];
                    case 3:
                        err_2 = _g.sent();
                        console.error("Error in OpenAI completion", err_2);
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OpenAIModel;
}());
exports.default = OpenAIModel;
