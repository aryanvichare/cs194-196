import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function IncidentDetails() {
  return (
    <div className="w-80 border-l border-border bg-background p-4">
      <div className="space-y-4">
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Summary</CardTitle>
              <Button size="icon" variant="ghost">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium">Incident Description</h3>
            <p className="text-sm text-muted-foreground">
              Mrs. Brennan has called 911 multiple times after slipping off her bed. She is still waiting for assistance at. Police are aware and en route.
            </p>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Medical Concerns</h4>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                  <li>Possible injury from slipping off the bed</li>
                  <li>Concern about breaking ankle if she moves</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Additional Details</h4>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                  <li>Caller has made multiple attempts to reach 911</li>
                  <li>Police are aware of the call and are on their way</li>
                  <li>Dispatcher has noted that the caller is still waiting</li>
                  <li>Access to the house is through the back door</li>
                </ul>
              </div>
            </div>
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

