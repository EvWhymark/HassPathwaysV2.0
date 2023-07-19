import React from "react";
import { SiDiscord, SiGithub } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex flex-col md:flex-row gap-4">
        <SiDiscord className="icon" />
        <SiGithub className="icon" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 sm:gap-x-12">
        <Link href="/faq">FAQ</Link>
        <Link href="/courses">My Courses</Link>
        <Link href="/pathways">My Pathways</Link>
      </div>
      <di>&copy; 2023 Hass Pathways</di>
    </footer>
  );
};

export default Footer;
