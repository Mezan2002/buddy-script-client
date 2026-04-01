import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/components/ui/CustomIcons";
import { useMe, useLikePost, useComments, useAddComment, useUpdatePost, useDeletePost, useLikeComment } from "@/lib/hooks";
import toast from "react-hot-toast";
import { formatTimeAgo } from "@/lib/utils";

const getAvatar = (user) => {
  if (user?.avatar) return user.avatar;
  const name = user?.firstName ? `${user.firstName}+${user.lastName || ''}`.trim() : 'User';
  return `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`;
};

const CommentInput = ({ currentUser, value, onChange, onSubmit, isPending }) => (
  <form 
    className="d-flex align-items-center w-100" 
    onSubmit={onSubmit}
    style={{ 
      backgroundColor: "var(--bg3, #f0f2f5)", 
      borderRadius: "50px", 
      padding: "10px 18px",
      border: "1px solid transparent"
    }}
  >
    {/* Avatar */}
    <div className="flex-shrink-0 d-flex align-items-center" style={{ marginRight: "12px" }}>
      <Image
        src={getAvatar(currentUser)}
        alt="My Avatar"
        width={36}
        height={36}
        className="rounded-circle"
        style={{ objectFit: "cover", width: "36px", height: "36px", minWidth: "36px" }}
        unoptimized={true}
      />
    </div>
    
    {/* Input Box */}
    <div className="flex-grow-1" style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        className="w-100 border-0 bg-transparent shadow-none"
        placeholder="Write a comment"
        value={value}
        onChange={onChange}
        disabled={isPending}
        style={{ 
          fontSize: "15px", 
          fontWeight: 500,
          color: "var(--color-heading, #4A5568)", 
          outline: "none", 
          padding: "0" 
        }}
      />
    </div>
    
    {/* Icons */}
    <div className="flex-shrink-0 d-flex align-items-center ms-2" style={{ color: "var(--color-heading, #65676B)" }}>
      <button type="button" className="bg-transparent border-0 p-1 me-2 d-flex align-items-center justify-content-center" style={{ color: "inherit", cursor: "pointer" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a3 3 0 003-3V6a3 3 0 00-6 0v5a3 3 0 003 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2M12 18v4m-4 0h8" />
        </svg>
      </button>
      <button type="button" className="bg-transparent border-0 p-1 d-flex align-items-center justify-content-center" style={{ color: "inherit", cursor: "pointer" }}>
        <Icons.Photo width={20} height={20} />
      </button>
    </div>

    <button type="submit" hidden disabled={isPending || !value?.trim()} />
  </form>
);

const CommentItem = ({ comment, currentUser, post, allComments, addCommentMutation, level = 0 }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const likeCommentMutation = useLikeComment();

  const isLiked = comment.likes?.some(like => (typeof like === 'object' ? like._id : like) === currentUser?._id);

  const handleLike = () => {
    likeCommentMutation.mutate({ commentId: comment._id, postId: post._id });
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addCommentMutation.mutate(
      { content: replyText, parentCommentId: comment._id },
      {
        onSuccess: () => {
          setReplyText("");
          setShowReplyInput(false);
          toast.success("Reply added!");
        }
      }
    );
  };

  const replies = allComments?.filter(c => c.parentComment === comment._id) || [];

  return (
    <div className={`d-flex w-100 mb-3 ${level > 0 ? "mt-2" : ""}`} style={{ maxWidth: "100%" }}>
      <div className="flex-shrink-0 me-2 mt-1">
        <Link href={`/profile/${comment.author._id}`}>
          <Image
            src={getAvatar(comment.author)}
            alt=""
            width={40}
            height={40}
            className="rounded-circle"
            style={{ objectFit: "cover", width: "40px", height: "40px", minWidth: "40px" }}
          />
        </Link>
      </div>
      <div className="flex-grow-1 position-relative" style={{ minWidth: 0 }}>
        {/* Grey Box */}
        <div 
          className="p-3"
          style={{ 
            backgroundColor: "var(--bg3, #f0f2f5)", 
            borderRadius: "18px",
            color: "var(--color-body, #050505)",
            position: "relative",
            width: "100%",
            wordBreak: "break-word"
          }}
        >
          <Link href={`/profile/${comment.author._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <h6 className="mb-1" style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-heading, #050505)" }}>
              {comment.author.firstName} {comment.author.lastName}
            </h6>
          </Link>
          <p className="mb-0" style={{ fontSize: "14px", lineHeight: "1.4", color: "var(--color-body, #050505)" }}>
            {comment.content}
          </p>

          {/* Reactions Pill */}
          {comment.likes?.length > 0 && (
            <div 
              className="position-absolute d-flex align-items-center shadow-sm"
              title={comment.likes.map(u => u.firstName).filter(Boolean).join(', ') || 'Liked'}
              style={{
                bottom: "-12px",
                right: "4px",
                backgroundColor: "var(--bg1, #ffffff)",
                borderRadius: "15px",
                padding: "2px 8px",
                fontSize: "13px",
                zIndex: 2,
                border: "1px solid var(--bcolor, #e4e6eb)",
                cursor: "pointer"
              }}
            >
              <span className="text-primary me-1 d-flex align-items-center"><Icons.Like width={16} height={16} /></span>
              <span style={{ color: "var(--color-heading, #65676B)" }}>
                {comment.likes.length}
              </span>
            </div>
          )}
        </div>

        {/* Reply/Time links beneath */}
        <div className="d-flex align-items-center mt-2 ms-3" style={{ fontSize: "13px", color: "var(--color-heading, #65676B)", fontWeight: 600 }}>
          <button onClick={handleLike} className="bg-transparent border-0 p-0 text-inherit me-3 flex-shrink-0" style={{ fontWeight: 600, color: isLiked ? "var(--primary-color, #0d6efd)" : "var(--color-heading, #65676B)" }}>{isLiked ? "Liked" : "Like."}</button>
          <button onClick={() => setShowReplyInput(!showReplyInput)} className="bg-transparent border-0 p-0 text-inherit me-3 flex-shrink-0" style={{ fontWeight: 600, color: "var(--color-heading, #65676B)" }}>Reply.</button>
          <span className="flex-shrink-0" style={{ fontWeight: 400 }}>.{formatTimeAgo(comment.createdAt)}</span>
        </div>

        {/* Nested Reply Box */}
        {showReplyInput && (
          <div className="mt-2 mb-2">
            <CommentInput 
              currentUser={currentUser}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onSubmit={handleReplySubmit}
              isPending={addCommentMutation.isPending}
            />
          </div>
        )}

        {/* Render Replies Recursive */}
        {replies.length > 0 && (
          <div className="mt-3">
            {replies.map(reply => (
              <CommentItem 
                key={reply._id} 
                comment={reply} 
                currentUser={currentUser} 
                post={post}
                allComments={allComments}
                addCommentMutation={addCommentMutation}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const PostCard = ({ post }) => {
  const { data: currentUser } = useMe();
  const likeMutation = useLikePost();
  const addCommentMutation = useAddComment(post._id);
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  const { data: comments, isLoading: isLoadingComments } = useComments(post._id);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editVisibility, setEditVisibility] = useState(post.visibility || 'public');
  const [showEditVisibilityDropdown, setShowEditVisibilityDropdown] = useState(false);
  const [editFiles, setEditFiles] = useState([]);
  const [editPreviewUrls, setEditPreviewUrls] = useState([]);
  const [removeDocImages, setRemoveDocImages] = useState(false);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    return () => editPreviewUrls.forEach(url => URL.revokeObjectURL(url));
  }, [editPreviewUrls]);

  const isLiked = post.likes?.some(like => (typeof like === 'object' ? like._id : like) === currentUser?._id);
  const isAuthor = currentUser && post.author && currentUser._id === post.author._id;

  const handleEditSubmit = () => {
    if (!editContent.trim() && editFiles.length === 0 && (!post.images || removeDocImages)) return;

    const formData = new FormData();
    formData.append("content", editContent);
    formData.append("visibility", editVisibility);
    if (removeDocImages) {
      formData.append("removeExistingImages", "true");
    }
    editFiles.forEach(file => formData.append("images", file));

    updatePostMutation.mutate({ postId: post._id, postData: formData }, {
      onSuccess: () => {
        setIsEditing(false);
        setEditFiles([]);
        setEditPreviewUrls([]);
        setRemoveDocImages(false);
        toast.success("Post updated!");
      },
      onError: () => toast.error("Failed to update post")
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditContent(post.content);
    setEditVisibility(post.visibility || 'public');
    setEditFiles([]);
    setEditPreviewUrls([]);
    setRemoveDocImages(false);
  };

  const handleEditFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setEditFiles(prev => [...prev, ...selectedFiles]);
      const newUrls = selectedFiles.map(f => URL.createObjectURL(f));
      setEditPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(post._id, {
        onSuccess: () => toast.success("Post deleted!"),
        onError: () => toast.error("Failed to delete post")
      });
    }
  };

  const handleLike = () => {
    likeMutation.mutate(post._id, {
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to like post");
      },
    });
  };

  const handleAddComment = (e, textContent, setTextContent) => {
    e.preventDefault();
    if (!textContent.trim()) return;

    addCommentMutation.mutate({ content: textContent }, {
      onSuccess: () => {
        setTextContent("");
        setShowAllComments(true);
        toast.success("Comment added!");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to add comment");
      },
    });
  };

  const rootComments = comments?.filter(c => !c.parentComment) || [];
  const displayedComments = showAllComments ? rootComments : rootComments.slice(-1);

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <Image
                src={getAvatar(post.author)}
                alt="Avatar"
                width={50}
                height={50}
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author ? `${post.author.firstName} ${post.author.lastName}` : "Unknown User"}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {formatTimeAgo(post.createdAt)} . <Link href="#0">{post.visibility ? post.visibility.charAt(0).toUpperCase() + post.visibility.slice(1) : 'Public'}</Link>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="_feed_timeline_post_dropdown_link"
              >
                <Icons.ThreeDots />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="_feed_timeline_dropdown _timeline_dropdown show">
                <ul className="_feed_timeline_dropdown_list">
                  <li className="_feed_timeline_dropdown_item">
                    <Link href="#" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icons.PostSave />
                      </span>
                      Save Post
                    </Link>
                  </li>
                  <li className="_feed_timeline_dropdown_item">
                    <Link href="#" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icons.PostNotification />
                      </span>
                      Turn On Notification
                    </Link>
                  </li>
                  <li className="_feed_timeline_dropdown_item">
                    <Link href="#" className="_feed_timeline_dropdown_link">
                      <span>
                        <Icons.PostHide />
                      </span>
                      Hide
                    </Link>
                  </li>
                  {isAuthor && (
                    <>
                      <li className="_feed_timeline_dropdown_item">
                        <button 
                          className="_feed_timeline_dropdown_link bg-transparent border-0 w-100 text-start"
                          onClick={() => { setIsEditing(true); setIsDropdownOpen(false); }}
                        >
                          <span>
                            <Icons.PostEdit />
                          </span>
                          Edit Post
                        </button>
                      </li>
                      <li className="_feed_timeline_dropdown_item">
                        <button 
                          className="_feed_timeline_dropdown_link bg-transparent border-0 w-100 text-start text-danger"
                          onClick={() => { handleDelete(); setIsDropdownOpen(false); }}
                          disabled={deletePostMutation.isPending}
                        >
                          <span>
                            <Icons.PostDelete />
                          </span>
                          Delete Post
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className="mt-2 mb-3 bg-white p-3 rounded border">
            <div className="d-flex align-items-center mb-2">
              <div className="position-relative">
                <button
                  type="button"
                  className="btn btn-sm d-flex align-items-center gap-1 py-0 px-2"
                  style={{ backgroundColor: "var(--bg3)", border: "1px solid var(--bcolor2)", borderRadius: "4px", fontSize: "12px", color: "var(--color-body)" }}
                  onClick={() => setShowEditVisibilityDropdown(!showEditVisibilityDropdown)}
                >
                  <span className="text-capitalize">{editVisibility}</span>
                  <Icons.Dropdown width={10} height={10} />
                </button>
                {showEditVisibilityDropdown && (
                  <div className="position-absolute shadow-sm rounded p-1 mt-1 border bg-white" style={{ zIndex: 10, minWidth: "120px", top: "100%", left: 0 }}>
                    <button type="button" className="dropdown-item py-1 px-2 rounded" style={{ fontSize: "13px" }} onClick={() => { setEditVisibility("public"); setShowEditVisibilityDropdown(false); }}>Public</button>
                    <button type="button" className="dropdown-item py-1 px-2 rounded" style={{ fontSize: "13px" }} onClick={() => { setEditVisibility("private"); setShowEditVisibilityDropdown(false); }}>Private</button>
                  </div>
                )}
              </div>
            </div>

            <textarea 
              className="form-control border-0 bg-light mb-2 shadow-none" 
              value={editContent} 
              onChange={e => setEditContent(e.target.value)} 
              rows="3"
              style={{ fontSize: "15px", color: "var(--color-heading, #050505)", borderRadius: "8px" }}
            />

            {(post.images?.length > 0 || post.image) && !removeDocImages && (
              <div className="position-relative mb-2">
                <button type="button" className="btn-close position-absolute p-1 bg-white rounded-circle shadow-sm" aria-label="Remove existing images" style={{ zIndex: 10, top: "4px", right: "4px", fontSize: "12px" }} onClick={() => setRemoveDocImages(true)} />
                <div style={{ opacity: 0.7 }}>
                   <Image src={post.images?.[0] || post.image} alt="Existing Post image" width={200} height={100} className="rounded" style={{ objectFit: "cover" }} unoptimized={true} />
                   <p className="small text-muted mb-0">Existing Image (Save to keep)</p>
                </div>
              </div>
            )}

            {editPreviewUrls.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mb-2">
                {editPreviewUrls.map((url, idx) => (
                  <div key={url} className="position-relative">
                    <button type="button" className="btn-close position-absolute p-1 bg-white rounded-circle shadow-sm" style={{ zIndex: 10, top: "4px", right: "4px", fontSize: "10px" }} onClick={() => { setEditFiles(prev => prev.filter((_, i) => i !== idx)); setEditPreviewUrls(prev => { const urls = [...prev]; URL.revokeObjectURL(urls[idx]); urls.splice(idx, 1); return urls; }); }} />
                    <img src={url} alt="To upload" className="rounded border" style={{ height: "80px", width: "80px", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <button type="button" className="btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" onClick={() => fileInputRef.current?.click()} style={{ width: "36px", height: "36px" }}>
                 <Icons.Photo width={18} height={18} />
                 <input type="file" hidden multiple ref={fileInputRef} accept="image/*" onChange={handleEditFileChange} />
              </button>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-light rounded-pill px-3" onClick={cancelEdit}>Cancel</button>
                <button className="btn btn-sm btn-primary rounded-pill px-3" disabled={updatePostMutation.isPending} onClick={handleEditSubmit}>{updatePostMutation.isPending ? "..." : "Save"}</button>
              </div>
            </div>
          </div>
        ) : (
          <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>
        )}
        {(post.images?.length > 0 || post.image) && (
          <div className="_feed_inner_timeline_image" style={{ marginBottom: "16px" }}>
            {post.images?.length > 1 ? (
              <div className="d-flex flex-wrap gap-2">
                {post.images.map((imgUrl, idx) => (
                  <div key={idx} style={{ flex: "1 1 calc(50% - 0.5rem)" }}>
                    <Image
                      src={imgUrl}
                      alt={`Post content ${idx + 1}`}
                      width={600}
                      height={300}
                      className="_time_img"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      unoptimized={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Image
                src={post.images?.[0] || post.image}
                alt="Post content"
                width={600}
                height={300}
                className="_time_img"
                unoptimized={true}
              />
            )}
          </div>
        )}
      </div>

      {/* Reactions Info */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image" title={post.likes?.map(u => u.firstName).filter(Boolean).join(', ') || 'Liked'}>
          {post.likes.length > 0 && Array.from({ length: Math.min(post.likes.length, 5) }).map((_, i) => (
            <Image
              key={i}
              src={getAvatar(post.likes[i])}
              alt="User"
              width={24}
              height={24}
              className={i === 0 ? "_react_img1" : "_react_img"}
              style={{ objectFit: "cover" }}
              unoptimized={true}
            />
          ))}
          {post.likes.length > 5 && (
            <p className="_feed_inner_timeline_total_reacts_para">{post.likes.length - 5}+</p>
          )}
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <span>{post.likes.length || 0}</span> Like
          </p>
          <p className="_feed_inner_timeline_total_reacts_para1 _mar_l8">
            <button onClick={() => setShowAllComments(!showAllComments)} className="border-0 bg-transparent p-0">
              <span>{post.commentsCount || 0}</span> Comment
            </button>
          </p>
          <p className="_feed_inner_timeline_total_reacts_para1 _mar_l8">
            <span>0</span> Share
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="_feed_inner_timeline_reaction">
        <button
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? "_feed_reaction_active" : ""}`}
          onClick={handleLike}
          disabled={likeMutation.isPending}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <Icons.Like className="_mar_img" />
              {isLiked ? "Liked" : "Like"}
            </span>
          </span>
        </button>
        <button 
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
          onClick={() => setShowAllComments(!showAllComments)}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <Icons.Comment className="_mar_img _reaction_svg" />
              Comment
            </span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <Icons.Share className="_mar_img _reaction_svg" />
              Share
            </span>
          </span>
        </button>
      </div>

      {/* Top Comment Section */}
      <div className="_feed_inner_timeline_cooment_area mt-3 mb-3">
        <CommentInput 
          currentUser={currentUser}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onSubmit={(e) => handleAddComment(e, commentText, setCommentText)}
          isPending={addCommentMutation.isPending}
        />
      </div>

      {/* Previous Comments */}
      {comments && comments.length > 0 && (
        <>
          <div className="_timline_comment_main mb-2">
            {!showAllComments && comments.length > 1 && (
              <div className="_previous_comment mb-3" style={{ paddingLeft: "4px" }}>
                <button 
                  type="button" 
                  className="_previous_comment_txt p-0 border-0 bg-transparent"
                  onClick={() => setShowAllComments(true)}
                  style={{ fontWeight: 600, color: "var(--color-heading, #4A5568)", fontSize: "15px" }}
                >
                  View {comments.length - 1} previous comments
                </button>
              </div>
            )}
            <div className="comments-list">
              {displayedComments?.map(comment => (
                <CommentItem 
                  key={comment._id} 
                  comment={comment} 
                  currentUser={currentUser} 
                  post={post}
                  allComments={comments}
                  addCommentMutation={addCommentMutation}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
