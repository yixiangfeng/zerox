import {
  CompletionResponse,
  ExtractionResponse,
  LLMParams,
  ModelProvider,
  OperationMode,
} from "../types";
import { formatMarkdown } from "./common";

export const isCompletionResponse = (
  mode: OperationMode,
  response: CompletionResponse | ExtractionResponse
): response is CompletionResponse => {
  return mode === OperationMode.OCR;
};

const isExtractionResponse = (
  mode: OperationMode,
  response: CompletionResponse | ExtractionResponse
): response is ExtractionResponse => {
  return mode === OperationMode.EXTRACTION;
};

export class CompletionProcessor {
  static process<T extends OperationMode>(
    mode: T,
    response: CompletionResponse | ExtractionResponse
  ): T extends OperationMode.EXTRACTION
    ? ExtractionResponse
    : CompletionResponse & { contentLength: number } {
    if (isCompletionResponse(mode, response)) {
      const content = response.content;
      return {
        ...response,
        content:
          typeof content === "string" ? formatMarkdown(content) : content,
        contentLength: response.content?.length || 0,
      } as T extends OperationMode.EXTRACTION
        ? ExtractionResponse
        : CompletionResponse & { contentLength: number };
    }
    if (isExtractionResponse(mode, response)) {
      const extracted = response.extracted;
      return {
        ...response,
        extracted:
          typeof extracted === "object" ? extracted : JSON.parse(extracted),
      } as T extends OperationMode.EXTRACTION
        ? ExtractionResponse
        : CompletionResponse & { contentLength: number };
    }
    return response as T extends OperationMode.EXTRACTION
      ? ExtractionResponse
      : CompletionResponse & { contentLength: number };
  }
}

const providerDefaultParams: Record<ModelProvider | string, LLMParams> = {
  [ModelProvider.AZURE]: {
    frequencyPenalty: 0,
    maxTokens: 4000,
    presencePenalty: 0,
    temperature: 0,
    topP: 1,
  },
  [ModelProvider.BEDROCK]: {
    maxTokens: 4000,
    temperature: 0,
    topP: 1,
  },
  [ModelProvider.GOOGLE]: {
    frequencyPenalty: 0,
    maxOutputTokens: 4000,
    presencePenalty: 0,
    temperature: 0,
    topP: 1,
  },
  [ModelProvider.OPENAI]: {
    frequencyPenalty: 0,
    maxTokens: 4000,
    presencePenalty: 0,
    temperature: 0,
    topP: 1,
  },
  [ModelProvider.OPEN_ROUTER]: {
    frequencyPenalty: 0,
    maxTokens: 4000,
    presencePenalty: 0,
    temperature: 0,
    topP: 1,
  },
};

export const validateLLMParams = (
  params: Partial<LLMParams>,
  provider: ModelProvider | string
): LLMParams => {
  const defaultParams = providerDefaultParams[provider];

  if (!defaultParams) {
    throw new Error(`Unsupported model provider: ${provider}`);
  }

  const validKeys = Object.keys(defaultParams);
  for (const key of Object.keys(params)) {
    if (!validKeys.includes(key)) {
      throw new Error(
        `Invalid LLM parameter for ${provider}: ${key}. Valid parameters are: ${validKeys.join(
          ", "
        )}`
      );
    }
    if (typeof params[key as keyof LLMParams] !== "number") {
      throw new Error(`Value for '${key}' must be a number`);
    }
  }

  return { ...defaultParams, ...params };
};
