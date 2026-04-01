import React from "react";

const PostSkeleton = () => {
  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16 animate-pulse">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <div className="bg-gray-200 rounded-full w-[50px] h-[50px]"></div>
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-24"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
        </div>
        <div className="bg-gray-100 rounded-lg w-full h-[300px]"></div>
      </div>
      
      <div className="_padd_r24 _padd_l24 mt-4">
        <div className="flex space-x-4 border-t pt-4">
          <div className="h-8 bg-gray-100 rounded w-20"></div>
          <div className="h-8 bg-gray-100 rounded w-20"></div>
          <div className="h-8 bg-gray-100 rounded w-20"></div>
        </div>
      </div>

      <style jsx>{`
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .bg-gray-200 { background-color: #e5e7eb; }
        .bg-gray-100 { background-color: #f3f4f6; }
      `}</style>
    </div>
  );
};

export default PostSkeleton;
