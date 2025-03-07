import { CompletionResponse, ExtractionResponse, LLMParams, ModelProvider, OperationMode } from "../types";
export declare const isCompletionResponse: (mode: OperationMode, response: CompletionResponse | ExtractionResponse) => response is CompletionResponse;
export declare class CompletionProcessor {
    static process<T extends OperationMode>(mode: T, response: CompletionResponse | ExtractionResponse): T extends OperationMode.EXTRACTION ? ExtractionResponse : CompletionResponse & {
        contentLength: number;
    };
}
export declare const validateLLMParams: (params: Partial<LLMParams>, provider: ModelProvider | string) => LLMParams;
