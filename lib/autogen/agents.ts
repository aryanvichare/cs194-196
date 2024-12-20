// @ts-expect-error autogen not typed
import autogen from 'autogen';

export class TranscriptionAgent extends autogen.AssistantAgent {
  constructor() {
    super("transcription_agent", {
      llm_config: {
        // Your OpenAI or other LLM config
        temperature: 0.7,
        model: "gpt-4"
      },
      system_message: `You are an expert in transcribing and analyzing emergency calls. 
      Extract key information including:
      - Emergency type and severity
      - Location details
      - Medical concerns
      - Required resources`
    });
  }
}

export class VideoAnalysisAgent extends autogen.AssistantAgent {
  constructor() {
    super("video_analysis_agent", {
      llm_config: {
        temperature: 0.7,
        model: "gpt-4"
      }
    });
  }
}  

export class SeverityAgent extends autogen.AssistantAgent {
  constructor() {
    super("severity_agent", {
      llm_config: {
        temperature: 0.7,
        model: "gpt-4"
      }
    });
  }
}


export class TriageAgent extends autogen.AssistantAgent {
    constructor() {
        super("triage_agent", {
            llm_config: {
                temperature: 0.7,
                model: "gpt-4"
            }
        });
    }
}  

export class DispatchAgent extends autogen.AssistantAgent {
    constructor() {
        super("dispatch_agent", {
            llm_config: {
                temperature: 0.7,
                model: "gpt-4"
            }
        });
    }
}   