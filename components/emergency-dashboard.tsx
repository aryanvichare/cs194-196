"use client";
import { useState } from "react";
import { CallChat } from "@/components/call-chat";
import { CallTranscript } from "@/components/call-transcript";
import { IncidentDetails } from "@/components/incident-details";
import { IncidentSidebar } from "@/components/incident-sidebar";
import { NavBar } from "@/components/nav-bar";
import type { ActiveCall } from "@/components/active-calls-list";

export default function EmergencyDashboard() {
  const [selectedCall, setSelectedCall] = useState<ActiveCall | null>(null);

  return (
    <div className='flex h-screen flex-col bg-background text-foreground'>
      <NavBar />
      <div className='flex flex-1 overflow-hidden'>
        <IncidentSidebar
          onSelectCall={setSelectedCall}
          selectedCallId={selectedCall?.id ?? null}
        />
        {selectedCall ? (
          <CallChat activeCall={selectedCall} />
        ) : (
          <CallTranscript />
        )}
        <IncidentDetails />
      </div>
    </div>
  );
}
