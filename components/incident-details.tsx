import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { ActiveCall } from './active-calls-list'

interface IncidentDetailsProps {
  activeCall: ActiveCall | null
}

export function IncidentDetails({ activeCall }: IncidentDetailsProps) {
  if (!activeCall) {
    return (
      <div className="w-80 border-l border-border bg-background p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Select a call to view details</p>
      </div>
    )
  }

  return (
    <div className="w-80 border-l border-border bg-background p-4">
      <div className="space-y-4">
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Incident Summary</CardTitle>
              <Button size="icon" variant="ghost">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium">Caller Information</h3>
            <p className="text-sm text-muted-foreground">
              {activeCall.caller} - {activeCall.location}
            </p>
            <Separator className="my-4" />
            <h4 className="font-medium">Incident Type</h4>
            <p className="text-sm text-muted-foreground">{activeCall.type}</p>
            <Separator className="my-4" />
            <h4 className="font-medium">Duration</h4>
            <p className="text-sm text-muted-foreground">{activeCall.duration}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="bg-background text-foreground">
                Analyze
              </Button>
              <Button variant="ghost" size="icon">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

