"use client"; // Add this directive at the top
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard"); // Redirect to the dashboard page
  }, [router]);

  return (
    <div>
      <h2>Hello brother</h2>
      <Button>Button</Button>
    </div>
  );
}
