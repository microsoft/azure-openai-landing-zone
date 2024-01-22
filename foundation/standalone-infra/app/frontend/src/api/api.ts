import { AskRequest, AskResponse, ChatRequest, UploadFileRequest, UploadFileResponse } from "./models";

export async function askApi(options: AskRequest): Promise<AskResponse> {
  const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          question: options.question,
          approach: options.approach,
          overrides: {
              semantic_ranker: options.overrides?.semanticRanker,
              semantic_captions: options.overrides?.semanticCaptions,
              top: options.overrides?.top,
              temperature: options.overrides?.temperature,
              prompt_template: options.overrides?.promptTemplate,
              prompt_template_prefix: options.overrides?.promptTemplatePrefix,
              prompt_template_suffix: options.overrides?.promptTemplateSuffix,
              exclude_category: options.overrides?.excludeCategory
          }
      })
  });

  const parsedResponse: AskResponse = await response.json();
  if (response.status > 299 || !response.ok) {
      throw Error(parsedResponse.error || "Unknown error");
  }

  return parsedResponse;
}

export async function chatApi(options: ChatRequest): Promise<AskResponse> {
  const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          history: options.history,
          approach: options.approach,
          overrides: {
              semantic_ranker: options.overrides?.semanticRanker,
              semantic_captions: options.overrides?.semanticCaptions,
              top: options.overrides?.top,
              temperature: options.overrides?.temperature,
              prompt_template: options.overrides?.promptTemplate,
              prompt_template_prefix: options.overrides?.promptTemplatePrefix,
              prompt_template_suffix: options.overrides?.promptTemplateSuffix,
              exclude_category: options.overrides?.excludeCategory,
              suggest_followup_questions: options.overrides?.suggestFollowupQuestions
          }
      })
  });

  const parsedResponse: AskResponse = await response.json();
  if (response.status > 299 || !response.ok) {
      throw Error(parsedResponse.error || "Unknown error");
  }

  return parsedResponse;
}

export function getCitationFilePath(citation: string): string {
  return `/api/content/${citation}`;
}

export async function uploadApi(
  request: UploadFileRequest
): Promise<UploadFileResponse> {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: request.formData,
  });

  const parsedResponse: UploadFileResponse = await response.json();

  if (response.status > 299 || !response.ok) {
    throw Error(
      parsedResponse.error || `Failed to upload file: ${response.statusText}`
    );
  }

  return parsedResponse;
}
