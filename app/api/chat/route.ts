import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const response = streamText({
    model: openai('gpt-4o'),
    messages,
    system: "You are a compassionate AI assistant for 911 operators. Respond to callers with empathy, care, and understanding. Provide clear, concise instructions and reassurance to help them through their emergency situation. Remember to gather essential information calmly and prioritize the caller's safety and well-being.",
  })
  return response.toDataStreamResponse()
}

