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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLLMParams = exports.CompletionProcessor = exports.isCompletionResponse = void 0;
var types_1 = require("../types");
var common_1 = require("./common");
var isCompletionResponse = function (mode, response) {
    return mode === types_1.OperationMode.OCR;
};
exports.isCompletionResponse = isCompletionResponse;
var isExtractionResponse = function (mode, response) {
    return mode === types_1.OperationMode.EXTRACTION;
};
var CompletionProcessor = /** @class */ (function () {
    function CompletionProcessor() {
    }
    CompletionProcessor.process = function (mode, response) {
        var _a;
        if ((0, exports.isCompletionResponse)(mode, response)) {
            var content = response.content;
            return __assign(__assign({}, response), { content: typeof content === "string" ? (0, common_1.formatMarkdown)(content) : content, contentLength: ((_a = response.content) === null || _a === void 0 ? void 0 : _a.length) || 0 });
        }
        if (isExtractionResponse(mode, response)) {
            var extracted = response.extracted;
            return __assign(__assign({}, response), { extracted: typeof extracted === "object" ? extracted : JSON.parse(extracted) });
        }
        return response;
    };
    return CompletionProcessor;
}());
exports.CompletionProcessor = CompletionProcessor;
var providerDefaultParams = (_a = {},
    _a[types_1.ModelProvider.AZURE] = {
        frequencyPenalty: 0,
        maxTokens: 4000,
        presencePenalty: 0,
        temperature: 0,
        topP: 1,
    },
    _a[types_1.ModelProvider.BEDROCK] = {
        maxTokens: 4000,
        temperature: 0,
        topP: 1,
    },
    _a[types_1.ModelProvider.GOOGLE] = {
        frequencyPenalty: 0,
        maxOutputTokens: 4000,
        presencePenalty: 0,
        temperature: 0,
        topP: 1,
    },
    _a[types_1.ModelProvider.OPENAI] = {
        frequencyPenalty: 0,
        maxTokens: 4000,
        presencePenalty: 0,
        temperature: 0,
        topP: 1,
    },
    _a);
var validateLLMParams = function (params, provider) {
    var defaultParams = providerDefaultParams[provider];
    if (!defaultParams) {
        throw new Error("Unsupported model provider: ".concat(provider));
    }
    var validKeys = Object.keys(defaultParams);
    for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!validKeys.includes(key)) {
            throw new Error("Invalid LLM parameter for ".concat(provider, ": ").concat(key, ". Valid parameters are: ").concat(validKeys.join(", ")));
        }
        if (typeof params[key] !== "number") {
            throw new Error("Value for '".concat(key, "' must be a number"));
        }
    }
    return __assign(__assign({}, defaultParams), params);
};
exports.validateLLMParams = validateLLMParams;
