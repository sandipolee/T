// components/Breadcrumb.tsx
"use client";

// Adjust this import based on your actual components
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const DynamicBreadcrumbs = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(segment => segment);
  
    const toTitleCase = (str: string): string => {
      return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={href}>{toTitleCase(segment)}</Link>
                </BreadcrumbLink>
                {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
};

export default DynamicBreadcrumbs;