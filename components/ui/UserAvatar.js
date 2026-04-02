import React from "react";
import Image from "next/image";

const UserAvatar = ({ user, size = 40, className = "" }) => {
  if (user?.avatar && !user.avatar.includes("ui-avatars")) {
    return (
      <Image
        src={user.avatar}
        alt="Avatar"
        className={`rounded-circle ${className}`}
        width={size}
        height={size}
        style={{ objectFit: "cover" }}
      />
    );
  }

  const firstName = user?.firstName || "U";
  const lastName = user?.lastName || "";
  const initials =
    `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`.toUpperCase();

  const colors = [
    "#0d6efd",
    "#198754",
    "#dc3545",
    "#fd7e14",
    "#6f42c1",
    "#e83e8c",
    "#20c997",
    "#0dcaf0",
  ];
  const charCode =
    (firstName.charCodeAt(0) || 0) + (lastName.charCodeAt(0) || 0);
  const bgColor = colors[charCode % colors.length];

  return (
    <div
      className={`rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        backgroundColor: bgColor,
        fontSize: `${size * 0.45}px`,
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
