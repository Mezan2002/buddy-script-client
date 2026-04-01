"use client";
import CreatePost from "@/components/feed/CreatePost";
import Header from "@/components/feed/Header";
import LeftSidebar from "@/components/feed/LeftSidebar";
import MobileBottomNav from "@/components/feed/MobileBottomNav";
import MobileHeader from "@/components/feed/MobileHeader";
import PostCard from "@/components/feed/PostCard";
import PostSkeleton from "@/components/feed/PostSkeleton";
import RightSidebar from "@/components/feed/RightSidebar";
import Stories from "@/components/feed/Stories";
import ThemeToggle from "@/components/feed/ThemeToggle";

import { useInfinitePosts } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
export default function FeedPage() {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts(5);

  const allPosts =
    data?.pages?.flatMap(
      (page) => page.posts || (Array.isArray(page) ? page : []),
    ) || [];

  // Observer callback for infinite scroll
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      if (node) {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          },
          {
            rootMargin: "300px",
          }
        );
        observer.current.observe(node);
      }
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // Authentication check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("BST");
      if (!token) {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="_layout _layout_main_wrapper">
      <ThemeToggle />
      <div className="_main_layout">
        <Header />
        <MobileHeader />
        <MobileBottomNav />

        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar />
              </div>

              {/* Middle Content */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div
                  className="_layout_middle_wrap"
                  style={{
                    overflow: "auto",
                    height: "calc(100vh - 75px)",
                    position: "relative",
                  }}
                >
                  <div className="_layout_middle_inner">
                    <Stories />
                    <CreatePost />

                    {isError && (
                      <div className="alert alert-danger _mar_t24" role="alert">
                        Error loading posts. Please try again later.
                      </div>
                    )}

                    {isLoading ? (
                      // Show skeletons on initial load
                      Array.from({ length: 3 }).map((_, i) => (
                        <PostSkeleton key={`skeleton-${i}`} />
                      ))
                    ) : (
                      <>
                        {/* Render all posts */}
                        {allPosts.map((post) => (
                          <PostCard key={post._id} post={post} />
                        ))}

                        {/* Loading and Sentinel Combined */}
                        {isFetchingNextPage && (
                          <div
                            className="text-center _padd_b24"
                            key="loading-skeletons"
                          >
                            <PostSkeleton />
                            <PostSkeleton />
                          </div>
                        )}

                        {hasNextPage && (
                          <div
                            ref={lastElementRef}
                            className="text-center _padd_b24"
                            style={{ minHeight: "50px" }}
                            key="sentinel"
                          >
                            {!isFetchingNextPage && (
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading more posts...
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* End message */}
                        {!hasNextPage && allPosts.length > 0 && (
                          <p
                            className="text-center _padd_b24 text-muted"
                            key="end-message"
                          >
                            You&apos;ve reached the end! 🎉
                          </p>
                        )}
                      </>
                    )}

                    {!isLoading && allPosts.length === 0 && (
                      <div className="text-center _padd_t24" key="no-posts">
                        <p>No posts yet. Be the first to share something!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
