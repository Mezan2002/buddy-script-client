import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/components/ui/CustomIcons";
import { suggestedPeople, events, exploreItems } from "./mockData";

const LeftSidebar = () => {
  return (
    <div className="_layout_left_sidebar_wrap">
      {/* Explore Section */}
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <h4 className="_left_inner_area_explore_title _title5 _mar_b24">
            Explore
          </h4>
          <ul className="_left_inner_area_explore_list">
            {exploreItems.map((item, idx) => (
              <li key={idx} className="_left_inner_area_explore_item _explore_item">
                <Link
                  href={item.href}
                  className="_left_inner_area_explore_link"
                >
                  <item.icon />
                  {item.name}
                </Link>
                {item.hasBadge && (
                  <span className="_left_inner_area_explore_link_txt">
                    {item.badgeText}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested People */}
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_area_suggest_content _mar_b24">
            <h4 className="_left_inner_area_suggest_content_title _title5">
              Suggested People
            </h4>
            <span className="_left_inner_area_suggest_content_txt">
              <Link
                className="_left_inner_area_suggest_content_txt_link"
                href="#0"
              >
                See All
              </Link>
            </span>
          </div>
          {suggestedPeople.map((person) => (
            <div key={person.id} className="_left_inner_area_suggest_info">
              <div className="_left_inner_area_suggest_info_box">
                <div className="_left_inner_area_suggest_info_image">
                  <Link href="/profile">
                    <Image
                      src={person.avatar}
                      alt="Image"
                      width={40}
                      height={40}
                      className="_info_img"
                    />
                  </Link>
                </div>
                <div className="_left_inner_area_suggest_info_txt">
                  <Link href="/profile">
                    <h4 className="_left_inner_area_suggest_info_title">
                      {person.name}
                    </h4>
                  </Link>
                  <p className="_left_inner_area_suggest_info_para">
                    {person.role}
                  </p>
                </div>
              </div>
              <div className="_left_inner_area_suggest_info_link">
                <Link href="#0" className="_info_link">
                  Connect
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_event_content">
            <h4 className="_left_inner_event_title _title5">Events</h4>
            <Link href="/event" className="_left_inner_event_link">
              See all
            </Link>
          </div>
          {events.map((event) => (
            <Link
              key={event.id}
              className="_left_inner_event_card_link"
              href="/event-single"
            >
              <div className="_left_inner_event_card">
                <div className="_left_inner_event_card_iamge">
                  <Image
                    src="/assets/images/feed_event1.png"
                    alt="Image"
                    width={60}
                    height={60}
                    className="_card_img"
                  />
                </div>
                <div className="_left_inner_event_card_content">
                  <div className="_left_inner_card_date">
                    <p className="_left_inner_card_date_para">{event.date}</p>
                    <p className="_left_inner_card_date_para1">{event.month}</p>
                  </div>
                  <div className="_left_inner_card_txt">
                    <h4 className="_left_inner_event_card_title">
                      {event.title}
                    </h4>
                  </div>
                </div>
                <hr className="_underline" />
                <div className="_left_inner_event_bottom">
                  <p className="_left_iner_event_bottom">
                    {event.peopleGoing} People Going
                  </p>
                  <span className="_left_iner_event_bottom_link" onClick={(e) => { e.preventDefault(); }}>
                    Going
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
