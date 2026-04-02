"use client";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div
      className="_layout_main_wrapper d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "var(--bg1)" }}
    >
      <div className="text-center p-5 rounded-4 shadow-lg border card" 
           style={{ 
             maxWidth: "500px", 
             backgroundColor: "rgba(255, 255, 255, 0.8)", 
             backdropFilter: "blur(10px)",
             border: "1px solid rgba(255, 255, 255, 0.3)" 
           }}>
        <h1 
          className="display-1 fw-bold mb-4" 
          style={{ 
            background: "linear-gradient(45deg, #0d6efd, #6f42c1)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            letterSpacing: "-2px"
          }}
        >
          404
        </h1>
        <h2 className="h4 fw-semibold mb-3" style={{ color: "var(--color-heading)" }}>
          Oops! Page Not Found
        </h2>
        <p className="text-muted mb-4">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/feed" 
          className="btn btn-primary rounded-pill px-5 py-2 fw-semibold shadow-sm transition-all hover-lift"
        >
          Back to Feed
        </Link>
      </div>

      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(13, 110, 253, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
