"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div
      className="_layout_main_wrapper d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "var(--bg1)" }}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg border card"
        style={{
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(220, 53, 69, 0.2)",
        }}
      >
        <div className="mb-4 d-inline-flex p-3 rounded-circle bg-danger-subtle text-danger shadow-sm border border-danger-subtle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2
          className="h4 fw-bold mb-3"
          style={{ color: "var(--color-heading)" }}
        >
          Something went wrong!
        </h2>

        <p className="text-muted mb-4 px-3" style={{ fontSize: "15px" }}>
          An unexpected error occurred. We have been notified and are looking
          into it. Please try again or go back home.
        </p>

        <div className="d-flex flex-column gap-2 px-4">
          <button
            onClick={() => reset()}
            className="btn btn-primary rounded-pill py-2 fw-semibold shadow-sm transition-all hover-scale"
          >
            Try Again
          </button>

          <Link
            href="/feed"
            className="btn btn-light rounded-pill py-2 fw-semibold text-muted border transition-all"
          >
            Return to Feed
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hover-scale {
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }
        .hover-scale:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 15px rgba(13, 110, 253, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
