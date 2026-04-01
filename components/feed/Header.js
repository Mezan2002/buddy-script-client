import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/components/ui/CustomIcons";
import { notifications } from "./mockData";
import { useMe } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: user } = useMe();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("BST");
    queryClient.clear();
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        {/* ... Logo Section ... */}
        <div className="_logo_wrap">
          <Link href="/feed" className="navbar-brand">
            <Image
              src="/assets/images/logo.svg"
              alt="Logo"
              width={100}
              height={40}
              className="_nav_logo"
            />
          </Link>
        </div>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="_header_form ms-auto">
            <form className="_header_form_grp">
              <Icons.Search className="_header_form_svg" />
              <input
                className="form-control me-2 _inpt1"
                type="search"
                placeholder="input search text"
                aria-label="Search"
              />
            </form>
          </div>
          <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
            <li className="nav-item _header_nav_item">
              <Link
                href="/feed"
                className="nav-link _header_nav_link_active _header_nav_link"
              >
                <Icons.Home active />
              </Link>
            </li>
            <li className="nav-item _header_nav_item">
              <Link
                href="/friend-request"
                className="nav-link _header_nav_link"
              >
                <Icons.Friends />
              </Link>
            </li>
            <li className="nav-item _header_nav_item">
              <span
                id="_notify_btn"
                className="nav-link _header_nav_link _header_notify_btn"
                onClick={() => setIsNotifyOpen(!isNotifyOpen)}
              >
                <Icons.Notifications />
                <span className="_counting">6</span>
                {isNotifyOpen && (
                  <div
                    id="_notify_drop"
                    className="_notification_dropdown show"
                  >
                    {/* ... Notifications content ... */}
                    <div className="_notifications_content">
                      <h4 className="_notifications_content_title">
                        Notifications
                      </h4>
                      <div className="_notification_box_right">
                        <button
                          type="button"
                          className="_notification_box_right_link"
                        >
                          <Icons.ThreeDots />
                        </button>
                      </div>
                    </div>
                    <div className="_notifications_drop_box">
                      <div className="_notifications_drop_btn_grp">
                        <button className="_notifications_btn_link">All</button>
                        <button className="_notifications_btn_link1">
                          Unread
                        </button>
                      </div>
                      <div className="_notifications_all">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="_notification_box">
                            <div className="_notification_image">
                              <Image
                                src={notif.image}
                                alt="Image"
                                width={40}
                                height={40}
                                className="_notify_img"
                              />
                            </div>
                            <div className="_notification_txt">
                              <p className="_notification_para">
                                {notif.name && (
                                  <span className="_notify_txt_link">
                                    {notif.name}
                                  </span>
                                )}
                                {notif.text}
                              </p>
                              <div className="_nitification_time">
                                <span>{notif.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </span>
            </li>
            <li className="nav-item _header_nav_item">
              <Link href="/chat" className="nav-link _header_nav_link">
                <Icons.Chat />
                <span className="_counting">2</span>
              </Link>
            </li>
          </ul>
          <div className="_header_nav_profile">
            <div className="_header_nav_profile_image">
              <Image
                src={user?.avatar || "/assets/images/profile.png"}
                alt="Profile"
                width={40}
                height={40}
                className="_nav_profile_img"
              />
            </div>
            <div className="_header_nav_dropdown">
              <p className="_header_nav_para">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </p>
              <button
                id="_profile_drop_show_btn"
                className="_header_nav_dropdown_btn _dropdown_toggle"
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <Icons.Dropdown />
              </button>
            </div>
            {isProfileOpen && (
              <div
                id="_prfoile_drop"
                className="_nav_profile_dropdown _profile_dropdown show"
              >
                <div className="_nav_profile_dropdown_info">
                  <div className="_nav_profile_dropdown_image">
                    <Image
                      src={user?.avatar || "/assets/images/profile.png"}
                      alt="Profile"
                      width={50}
                      height={50}
                      className="_nav_drop_img"
                    />
                  </div>
                  <div className="_nav_profile_dropdown_info_txt">
                    <h4 className="_nav_dropdown_title">
                      {user ? `${user.firstName} ${user.lastName}` : "User"}
                    </h4>
                    <Link href="/profile" className="_nav_drop_profile">
                      View Profile
                    </Link>
                  </div>
                </div>
                <hr />
                <ul className="_nav_dropdown_list">
                  <li className="_nav_dropdown_list_item">
                    <Link href="#" className="_nav_dropdown_link">
                      <div className="_nav_drop_info">
                        <span>
                          <Icons.SettingsWithBorder />
                        </span>
                        Settings
                      </div>
                      <button type="submit" className="_nav_drop_btn_link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="10"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            fill="#112032"
                            d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                            opacity=".5"
                          />
                        </svg>
                      </button>
                    </Link>
                  </li>
                  <li className="_nav_dropdown_list_item">
                    <Link href="#" className="_nav_dropdown_link">
                      <div className="_nav_drop_info">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="#377DFF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M10 19a9 9 0 100-18 9 9 0 000 18z"
                            />
                            <path
                              stroke="#377DFF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009"
                            />
                          </svg>
                        </span>
                        Help & Support
                      </div>
                      <button type="submit" className="_nav_drop_btn_link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="10"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            fill="#112032"
                            d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                            opacity=".5"
                          />
                        </svg>
                      </button>
                    </Link>
                  </li>
                  <li className="_nav_dropdown_list_item">
                    <div className="_nav_dropdown_link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                      <div className="_nav_drop_info">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            fill="none"
                            viewBox="0 0 19 19"
                          >
                            <path
                              stroke="#377DFF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"
                            />
                          </svg>
                        </span>
                        Log Out
                      </div>
                      <button type="button" className="_nav_drop_btn_link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="10"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            fill="#112032"
                            d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                            opacity=".5"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
