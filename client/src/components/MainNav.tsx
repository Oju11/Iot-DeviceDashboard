import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import React from "react";

export default function MainNav() {
  return (
    <nav className="flex items-center gap-3 mb-6">
      <Link href="/">
        <Button variant="pop" size="sm">Dashboard</Button>
      </Link>
      <Link href="/devices">
        <Button variant="pop" size="sm">Devices</Button>
      </Link>
      <Link href="/telemetry">
        <Button variant="pop" size="sm">Telemetry</Button>
      </Link>
      <Link href="/analytics">
        <Button variant="pop" size="sm">Analytics</Button>
      </Link>
      <div className="ml-auto" />
      <Link href="/settings">
        <Button variant="ghost" size="sm">Settings</Button>
      </Link>
    </nav>
  );
}
