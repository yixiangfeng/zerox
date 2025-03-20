import { CompletionArgs, CompletionResponse, ExtractionArgs, ExtractionResponse, ModelInterface, OpenAICredentials, OpenRouterLLMParams, OperationMode } from "../types";
export default class OpenRouterModel implements ModelInterface {
    private apiKey;
    private model;
    private llmParams?;
    private helicone?;
    constructor(credentials: OpenAICredentials, model: string, helicone?: {
        token: string;
    }, llmParams?: Partial<OpenRouterLLMParams>);
    getCompletion(mode: OperationMode, params: CompletionArgs | ExtractionArgs): Promise<CompletionResponse | ExtractionResponse>;
    private createMessageContent;
    private handleOCR;
    private handleExtraction;
}
