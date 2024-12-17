import { Archive, Globe, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function NavBar() {
  return (
    <nav className='flex h-14 items-center border-b border-border bg-background px-4'>
      <div className='flex items-center gap-6'>
        <div className='font-semibold text-foreground'>Dashboard</div>
        <div className='flex items-center gap-4 text-muted-foreground'>
          <Link
            href='#'
            className={cn(
              "flex items-center gap-2 text-sm hover:text-foreground",
              "text-primary"
            )}>
            <LayoutDashboard className='h-4 w-4' />
            Dashboard
          </Link>
          <Link
            href='#'
            className='flex items-center gap-2 text-sm hover:text-foreground'>
            <Archive className='h-4 w-4' />
            Archive
          </Link>
          <Link
            href='#'
            className='flex items-center gap-2 text-sm hover:text-foreground'>
            <Globe className='h-4 w-4' />
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
}
