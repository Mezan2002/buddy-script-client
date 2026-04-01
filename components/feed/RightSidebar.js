import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/components/ui/CustomIcons";
import { friends, youMightLike } from "./mockData";

const RightSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="_layout_right_sidebar_wrap">
      {/* You Might Like */}
      <div className="_layout_right_sidebar_inner">
        <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_right_inner_area_info_content _mar_b24">
            <h4 className="_right_inner_area_info_content_title _title5">
              You Might Like
            </h4>
            <span className="_right_inner_area_info_content_txt">
              <Link
                className="_right_inner_area_info_content_txt_link"
                href="#0"
              >
                See All
              </Link>
            </span>
          </div>
          <hr className="_underline" />
          {youMightLike.map((person) => (
            <div key={person.id} className="_right_inner_area_info_ppl">
              <div className="_right_inner_area_info_box">
                <div className="_right_inner_area_info_box_image">
                  <Link href="/profile">
                    <Image
                      src={person.avatar}
                      alt="Image"
                      width={50}
                      height={50}
                      className="_ppl_img"
                    />
                  </Link>
                </div>
                <div className="_right_inner_area_info_box_txt">
                  <Link href="/profile">
                    <h4 className="_right_inner_area_info_box_title">
                      {person.name}
                    </h4>
                  </Link>
                  <p className="_right_inner_area_info_box_para">
                    {person.role}
                  </p>
                </div>
              </div>
              <div className="_right_info_btn_grp">
                <button type="button" className="_right_info_btn_link">
                  Ignore
                </button>
                <button
                  type="button"
                  className="_right_info_btn_link _right_info_btn_link_active"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Friends */}
      <div className="_layout_right_sidebar_inner">
        <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_feed_top_fixed">
            <div className="_feed_right_inner_area_card_content _mar_b24">
              <h4 className="_feed_right_inner_area_card_content_title _title5">
                Your Friends
              </h4>
              <span className="_feed_right_inner_area_card_content_txt">
                <Link
                  className="_feed_right_inner_area_card_content_txt_link"
                  href="/find-friends"
                >
                  See All
                </Link>
              </span>
            </div>
            <form className="_feed_right_inner_area_card_form">
              <Icons.Search className="_feed_right_inner_area_card_form_svg" />
              <input
                className="form-control me-2 _feed_right_inner_area_card_form_inpt"
                type="search"
                placeholder="input search text"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="_feed_bottom_fixed">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className={`_feed_right_inner_area_card_ppl ${friend.lastActive ? "_feed_right_inner_area_card_ppl_inactive" : ""}`}
              >
                <div className="_feed_right_inner_area_card_ppl_box">
                  <div className="_feed_right_inner_area_card_ppl_image">
                    <Link href="/profile">
                      <Image
                        src={friend.avatar}
                        alt=""
                        width={50}
                        height={50}
                        className="_box_ppl_img"
                      />
                    </Link>
                  </div>
                  <div className="_feed_right_inner_area_card_ppl_txt">
                    <Link href="/profile">
                      <h4 className="_feed_right_inner_area_card_ppl_title">
                        {friend.name}
                      </h4>
                    </Link>
                    <p className="_feed_right_inner_area_card_ppl_para">
                      {friend.role}
                    </p>
                  </div>
                </div>
                <div className="_feed_right_inner_area_card_ppl_side">
                  {friend.lastActive ? (
                    <span>{friend.lastActive}</span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <rect
                        width="12"
                        height="12"
                        x="1"
                        y="1"
                        fill="#0ACF83"
                        stroke="#fff"
                        strokeWidth="2"
                        rx="6"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Feed Component

export default RightSidebar;
