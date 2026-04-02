"use client";

import { useMe } from "@/lib/hooks";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    redirect("/feed");
  } else {
    redirect("/login");
  }

  return null;
}
