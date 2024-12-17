import { Phone } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface ActiveCall {
  id: string
  caller: string
  location: string
  duration: string
  type: string
}

const activeCalls: ActiveCall[] = [
  { id: '1', caller: 'John Doe', location: '123 Main St', duration: '5:23', type: 'Medical' },
  { id: '2', caller: 'Jane Smith', location: '456 Elm St', duration: '2:47', type: 'Fire' },
  { id: '3', caller: 'Bob Johnson', location: '789 Oak St', duration: '1:15', type: 'Police' },
  { id: '4', caller: 'Alice Brown', location: '321 Pine St', duration: '0:58', type: 'Medical' },
  { id: '5', caller: 'Charlie Davis', location: '654 Maple St', duration: '3:39', type: 'Police' },
]

interface ActiveCallsListProps {
  onSelectCall: (call: ActiveCall) => void
  selectedCallId: string | null
}

export function ActiveCallsList({ onSelectCall, selectedCallId }: ActiveCallsListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-250px)]">
      <div className="space-y-2">
        {activeCalls.map((call) => (
          <Button
            key={call.id}
            variant="ghost"
            className={`w-full justify-start text-left h-auto py-2 ${
              selectedCallId === call.id ? 'bg-secondary' : ''
            }`}
            onClick={() => onSelectCall(call)}
          >
            <div className="flex items-start">
              <Phone className="mr-2 h-4 w-4 mt-1 text-primary" />
              <div>
                <div className="font-medium">{call.caller}</div>
                <div className="text-xs text-muted-foreground">{call.location}</div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-primary">{call.duration}</span> - {call.type}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

