import os
import json
from typing import Dict, List, Any
from datetime import datetime
import autogen
from autogen import Agent, AssistantAgent, UserProxyAgent, ConversableAgent

# Configuration for the LLM
config_list = [
    {
        "model": "gpt-4o",
        "api_key": os.environ.get("OPENAI_API_KEY"),
        "temperature": 1,
    }
]

class TranscriptionAgent(AssistantAgent):
    """Agent responsible for transcribing and analyzing audio input"""
    
    def __init__(self):
        super().__init__(
            name="transcription_agent",
            system_message="""You are a specialized agent for transcribing and analyzing emergency calls.
            Your role is to convert audio to text and extract key information such as:
            - Emergency type
            - Location
            - Severity indicators
            - Caller emotional state""",
            llm_config={"config_list": config_list}
        )

class VideoAnalysisAgent(AssistantAgent):
    """Agent responsible for analyzing video feeds"""
    
    def __init__(self):
        super().__init__(
            name="video_analysis_agent",
            system_message="""You are a specialized agent for analyzing emergency video feeds.
            Your role is to:
            - Identify visual emergency indicators
            - Assess scene safety
            - Detect number of people involved
            - Identify environmental hazards""",
            llm_config={"config_list": config_list}
        )

class SeverityScoringAgent(AssistantAgent):
    """Agent responsible for determining emergency severity"""  
    
    def __init__(self): 
        super().__init__(
            name="severity_scoring_agent",
            system_message="""You are a specialized agent for scoring emergency severity.
            Your role is to:
            - Analyze inputs from transcription and visual analysis
            - Apply standardized severity metrics
            - Determine priority level
            - Identify immediate risk factors""",
            llm_config={"config_list": config_list}
        )

class TriageAgent(AssistantAgent):
    """Agent responsible for emergency triage decisions"""
    
    def __init__(self):
        super().__init__(
            name="triage_agent",
            system_message="""You are a specialized agent for emergency triage.
            Your role is to:
            - Evaluate severity scores
            - Determine resource requirements
            - Prioritize multiple concurrent emergencies
            - Make resource allocation recommendations""",
            llm_config={"config_list": config_list}
        )

class DispatchAgent(AssistantAgent):
    """Agent responsible for resource dispatch"""
    
    def __init__(self):
        super().__init__(
            name="dispatch_agent",
            system_message="""You are a specialized agent for emergency dispatch.
            Your role is to:
            - Coordinate emergency response units
            - Track resource availability
            - Optimize response routes
            - Maintain communication protocols""",
            llm_config={"config_list": config_list}
        )

class EmergencyResponseSystem:
    """Main class coordinating the emergency response system"""
    
    def __init__(self):
        self.transcription_agent = TranscriptionAgent()
        self.video_analysis_agent = VideoAnalysisAgent()
        self.severity_agent = SeverityScoringAgent()
        self.triage_agent = TriageAgent()
        self.dispatch_agent = DispatchAgent()
        
        # Coordinator agent to manage workflow
        self.coordinator = UserProxyAgent(
            name="coordinator",
            human_input_mode="NEVER",
            max_consecutive_auto_reply=10,
            is_termination_msg=lambda x: "EMERGENCY_HANDLED" in x.get("content", ""),
            code_execution_config=False,
            llm_config={"config_list": config_list}
        )
        
        self.emergency_queue = []
        
    async def process_emergency(self, emergency_data: Dict[str, Any]):
        """Process a new emergency through the agent workflow"""
        
        # Initialize the chat with emergency data
        chat_history = []
        
        # Start with transcription and video analysis in parallel
        transcription_result = await self.coordinator.initiate_chat(
            self.transcription_agent,
            message=json.dumps(emergency_data.get("audio_data", {}))
        )
        
        video_result = await self.coordinator.initiate_chat(
            self.video_analysis_agent,
            message=json.dumps(emergency_data.get("video_data", {}))
        )
        
        # Combine results for severity scoring
        combined_data = {
            "transcription": transcription_result,
            "video_analysis": video_result,
            "timestamp": datetime.now().isoformat()
        }
        
        # Get severity score
        severity_result = await self.coordinator.initiate_chat(
            self.severity_agent,
            message=json.dumps(combined_data)
        )
        
        # Triage with current emergency queue context
        triage_data = {
            "current_emergency": severity_result,
            "emergency_queue": self.emergency_queue
        }
        
        triage_result = await self.coordinator.initiate_chat(
            self.triage_agent,
            message=json.dumps(triage_data)
        )
        
        # Final dispatch decision
        dispatch_result = await self.coordinator.initiate_chat(
            self.dispatch_agent,
            message=json.dumps(triage_result)
        )
        
        return {
            "emergency_id": emergency_data.get("id"),
            "severity_score": severity_result,
            "triage_decision": triage_result,
            "dispatch_details": dispatch_result
        }
    
    def update_dashboard(self, processed_emergency: Dict[str, Any]):
        """Update the dashboard with latest emergency information"""
        # Implementation for dashboard updates would go here
        # This would integrate with your frontend framework
        pass

# Example usage
async def main():
    system = EmergencyResponseSystem()
    
    # Sample emergency data
    emergency_data = {
        "id": "EM123456",
        "timestamp": datetime.now().isoformat(),
        "audio_data": {
            "call_recording": "base64_encoded_audio...",
            "caller_number": "123-456-7890",
            "duration": 45
        },
        "video_data": {
            "feed_url": "https://emergency-cam/feed1",
            "location": {"lat": 40.7128, "lng": -74.0060}
        }
    }
    
    result = await system.process_emergency(emergency_data)
    system.update_dashboard(result)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())