import BreadcrumbChevron from "@/public/assets/svg/breadcrumb-chevron-right.svg?svgr";
import BreadcrumbHome from "@/public/assets/svg/breadcrumb-home.svg?svgr";
import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbLink {
  display: string;
  link: string;
}

interface BreadcrumbProps {
  path: Array<BreadcrumbLink>;
}

const BreadCrumb = ({ path }: BreadcrumbProps) => {
  return (
    <div className="flex gap-3 items-center">
      <Link href="/">
        <BreadcrumbHome />
      </Link>
      {path.map((link, index) => {
        if (index !== 0 && index !== path.length - 1) {
          if (index === 1)
            return (
              <Fragment key={index}>
                <BreadcrumbChevron />
                <Link href={link.link}>
                  <span className="text-sm ml-3 text-utility-gray-600 font-medium">
                    ...
                  </span>
                </Link>
              </Fragment>
            );
          return null;
        }
        return (
          <Fragment key={index}>
            <BreadcrumbChevron
              className={
                index === path.length - 1 ? undefined : "hidden fold:block"
              }
            />
            <Link href={link.link}>
              <span
                className={`text-sm ml-3 ${
                  index === path.length - 1
                    ? "text-text-brand-primary font-semibold"
                    : "text-utility-gray-600 font-medium hidden fold:block"
                }`}
              >
                {link.display}
              </span>
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
