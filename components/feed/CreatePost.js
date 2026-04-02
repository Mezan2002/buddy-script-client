import * as Icons from "@/components/ui/CustomIcons";
import UserAvatar from "@/components/ui/UserAvatar";
import { useCreatePost, useMe } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { data: user } = useMe();
  const createPostMutation = useCreatePost();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [visibility, setVisibility] = useState("public");
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && files.length === 0) {
      toast.error("Please add some text or an image to your post");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("visibility", visibility);
    files.forEach((file) => {
      formData.append("images", file);
    });

    createPostMutation.mutate(formData, {
      onSuccess: () => {
        setContent("");
        setFiles([]);
        setPreviewUrls([]);
        setVisibility("public");
        if (fileInputRef.current) fileInputRef.current.value = "";
        toast.success("Post created successfully!");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to create post");
      },
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);

      const newPreviewUrls = selectedFiles.map((f) => URL.createObjectURL(f));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <UserAvatar user={user} size={50} />
        </div>
        <div className="_feed_inner_text_area_box_form">
          <div className="d-flex align-items-center mb-2">
            <div className="position-relative">
              <button
                type="button"
                className="btn btn-sm d-flex align-items-center gap-1 py-0 px-2"
                style={{
                  backgroundColor: "var(--bg3)",
                  border: "1px solid var(--bcolor2)",
                  borderRadius: "4px",
                  fontSize: "12px",
                  color: "var(--color-body)",
                }}
                onClick={() =>
                  setShowVisibilityDropdown(!showVisibilityDropdown)
                }
              >
                <span className="text-capitalize">{visibility}</span>
                <Icons.Dropdown width={10} height={10} />
              </button>

              {showVisibilityDropdown && (
                <div
                  className="position-absolute shadow-sm rounded p-1 mt-1 border"
                  style={{
                    zIndex: 10,
                    backgroundColor: "var(--bg2)",
                    minWidth: "120px",
                    top: "100%",
                    left: 0,
                  }}
                >
                  <button
                    type="button"
                    className="dropdown-item py-1 px-2 rounded"
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setVisibility("public");
                      setShowVisibilityDropdown(false);
                    }}
                  >
                    Public
                  </button>
                  <button
                    type="button"
                    className="dropdown-item py-1 px-2 rounded"
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setVisibility("private");
                      setShowVisibilityDropdown(false);
                    }}
                  >
                    Private
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-floating">
            <textarea
              className="form-control _textarea"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <label className="_feed_textarea_label" htmlFor="floatingTextarea">
              {content ? "" : "Write something ... "}
              {!content && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  fill="none"
                  viewBox="0 0 23 24"
                >
                  <path
                    fill="#666"
                    d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z"
                  />
                </svg>
              )}
            </label>
          </div>

          {previewUrls.length > 0 && (
            <div
              className="mt-2 mb-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "8px",
              }}
            >
              {previewUrls.map((url, index) => (
                <div key={url} className="position-relative">
                  <button
                    type="button"
                    className="btn-close position-absolute p-1 bg-white rounded-circle shadow-sm"
                    aria-label="Remove image"
                    style={{
                      zIndex: 10,
                      top: "4px",
                      right: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setFiles((prev) => prev.filter((_, i) => i !== index));
                      setPreviewUrls((prev) => {
                        const newUrls = [...prev];
                        URL.revokeObjectURL(newUrls[index]);
                        newUrls.splice(index, 1);
                        return newUrls;
                      });
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  />
                  <Image
                    src={url}
                    alt={`Upload preview ${index + 1}`}
                    className="img-fluid rounded border w-100"
                    width={120}
                    height={120}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        hidden
        multiple
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Desktop Bottom Actions */}
      <div className="_feed_inner_text_area_bottom">
        <div className="_feed_inner_text_area_item">
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <Icons.Photo />
              </span>
              Photo
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_video _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <Icons.Video />
              </span>
              Video
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_event _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <Icons.Event />
              </span>
              Event
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_article _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <Icons.Article />
              </span>
              Article
            </button>
          </div>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={handleSubmit}
            disabled={createPostMutation.isPending}
          >
            <Icons.Post className="_mar_img" />
            <span>{createPostMutation.isPending ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Actions */}
      <div className="_feed_inner_text_area_bottom_mobile">
        <div className="_feed_inner_text_mobile">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <Icons.Photo />
                </span>
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_video _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <Icons.Video />
                </span>
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_event _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <Icons.Event />
                </span>
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_article _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <Icons.Article />
                </span>
              </button>
            </div>
          </div>
          <div className="_feed_inner_text_area_btn">
            <button
              type="button"
              className="_feed_inner_text_area_btn_link"
              onClick={handleSubmit}
              disabled={createPostMutation.isPending}
            >
              <Icons.Post className="_mar_img" />
              <span>{createPostMutation.isPending ? "..." : "Post"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
