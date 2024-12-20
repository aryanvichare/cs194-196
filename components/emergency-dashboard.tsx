'use client'

import { useState } from 'react'
import { CallChat } from "@/components/call-chat"
import { CallTranscript } from "@/components/call-transcript"
import { IncidentDetails } from "@/components/incident-details"
import { IncidentSidebar } from "@/components/incident-sidebar"
import { NavBar } from "@/components/nav-bar"
import type { ActiveCall } from '@/components/active-calls-list'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function EmergencyDashboard() {
  const [selectedCall, setSelectedCall] = useState<ActiveCall | null>(null)
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true)

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <NavBar />
      <div className="flex items-center justify-end p-2 bg-background border-b border-border">
        <div className="flex items-center space-x-2">
          <Switch
            id="ai-mode"
            checked={aiAssistEnabled}
            onCheckedChange={setAiAssistEnabled}
          />
          <Label htmlFor="ai-mode">AI Assistance</Label>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <IncidentSidebar onSelectCall={setSelectedCall} selectedCallId={selectedCall?.id ?? null} />
        {selectedCall ? (
          aiAssistEnabled ? (
            <CallChat activeCall={selectedCall} />
          ) : (
            <CallTranscript />
          )
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a call to view details
          </div>
        )}
        <IncidentDetails activeCall={selectedCall} />
      </div>
    </div>
  )
}

