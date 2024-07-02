import { UserCheck } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NavSidebar = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1 ">
          <AccordionTrigger className=" pr-3 hover:no-underline items-center gap-3 py-1 mb-2 rounded-lg  text-muted-foreground transition-all hover:text-primary hover:bg-muted">
            <p
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <UserCheck className="h-4 w-4" />
              Students
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <UserCheck className="h-4 w-4" />
              Unveryfied Students
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <UserCheck className="h-4 w-4" />
              Veryfied Students
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
      >
        <UserCheck className="h-4 w-4" />
        Issue Id Card
      </Link>
    </nav>
  );
};

export default NavSidebar;
