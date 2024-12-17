import { Volume2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CallTranscript() {
  return (
    <div className="flex-1 overflow-auto p-4 bg-background text-foreground">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Incoming Call</span>
          <Select defaultValue="uncategorized">
            <SelectTrigger className="w-[200px] bg-secondary text-secondary-foreground">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uncategorized">Uncategorized</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="non-emergency">Non-Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">DEVICE INFO</span>
          <Select defaultValue="unknown">
            <SelectTrigger className="w-[150px] bg-secondary text-secondary-foreground">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unknown">Unknown</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="landline">Landline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="ml-auto">
          Set Language
        </Button>
        <Button variant="secondary" className="bg-primary text-primary-foreground">Media</Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Volume2 className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Aug 29 | 1:09 PM</span>
        </div>
        <div className="text-sm text-muted-foreground">Call started</div>
        <div className="text-sm italic text-muted-foreground">
          Dollar County 911. Dispatcher 01:41. Where is Emergency?
        </div>
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          This is missus Brennan. I called about 4 times. I slipped off the bed, and the police haven&apos;t come yet.
        </div>
        <div className="text-sm italic text-muted-foreground">
          Okay. What&apos;s your address?
        </div>
      </div>
    </div>
  )
}

