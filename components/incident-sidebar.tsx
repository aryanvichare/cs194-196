import { Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ActiveCallsList, ActiveCall } from "./active-calls-list"

interface IncidentSidebarProps {
  onSelectCall: (call: ActiveCall) => void
  selectedCallId: string | null
}

export function IncidentSidebar({ onSelectCall, selectedCallId }: IncidentSidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-background p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="space-x-4">
          <Button variant="ghost" className="text-sm font-medium text-foreground">
            Incidents
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
            Agency
          </Button>
        </div>
        <Button size="icon" variant="ghost" className="text-primary">
          +
        </Button>
      </div>
      <div className="relative mt-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search Incidents" className="pl-8 bg-secondary text-secondary-foreground" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="mt-4 w-full bg-secondary text-secondary-foreground">
          <SelectValue placeholder="All Calls" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Calls</SelectItem>
          <SelectItem value="active">Active Calls</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <div className="mt-4 flex-1 overflow-hidden">
        <h3 className="mb-2 text-sm font-medium text-foreground">Active Calls</h3>
        <ActiveCallsList onSelectCall={onSelectCall} selectedCallId={selectedCallId} />
      </div>
    </div>
  )
}

