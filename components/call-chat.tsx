import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ActiveCall } from "./active-calls-list";

interface Message {
  id: string;
  sender: "staff" | "caller";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "staff",
    content: "911, what's your emergency?",
    timestamp: "14:23",
  },
  {
    id: "2",
    sender: "caller",
    content: "I've fallen and I can't get up!",
    timestamp: "14:23",
  },
  {
    id: "3",
    sender: "staff",
    content: "I understand. Can you tell me your location?",
    timestamp: "14:24",
  },
  {
    id: "4",
    sender: "caller",
    content: "I'm at home, 123 Main Street.",
    timestamp: "14:24",
  },
  {
    id: "5",
    sender: "staff",
    content:
      "Okay, I'm dispatching an ambulance to your location. Are you in any pain?",
    timestamp: "14:25",
  },
  {
    id: "6",
    sender: "caller",
    content: "My hip hurts pretty bad.",
    timestamp: "14:25",
  },
  {
    id: "7",
    sender: "staff",
    content:
      "Try not to move. Help is on the way. Can you stay on the line with me?",
    timestamp: "14:26",
  },
  {
    id: "8",
    sender: "caller",
    content: "Yes, I can stay on the line.",
    timestamp: "14:26",
  },
];

export function CallChat({ activeCall }: { activeCall: ActiveCall }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: String(messages.length + 1),
        sender: "staff",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className='flex flex-col flex-grow h-full bg-background text-foreground'>
      <div className='p-4 border-b border-border'>
        <h2 className='text-lg font-semibold'>{activeCall.caller}</h2>
        <p className='text-sm text-muted-foreground'>{activeCall.location}</p>
      </div>
      <ScrollArea className='flex-grow p-4'>
        <div className='space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "staff" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-[70%] rounded-lg p-2 ${
                  message.sender === "staff"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}>
                <p className='text-sm'>{message.content}</p>
                <p className='text-xs text-muted-foreground mt-1'>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className='p-4 border-t border-border'>
        <div className='flex space-x-2'>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className='flex-grow bg-secondary text-secondary-foreground'
          />
          <Button onClick={handleSendMessage} size='icon'>
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
