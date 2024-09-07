import {
  Home,
  LineChart,
  Bus,
  GraduationCap,
  Settings,
  Users2,
} from "lucide-react";

import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="fixed left-0 top-0 z-20 h-full w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
            >
              <GraduationCap className="h-5 w-5" />
              <span className="text-lg font-semibold">Gyan Joti TMS</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
            >
              <Bus className="h-5 w-5" />
              Routes
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 rounded-lg bg-accent px-4 py-2 text-accent-foreground"
            >
              <Users2 className="h-5 w-5" />
              Students
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Reports
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <Link
            href="#"
            className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
