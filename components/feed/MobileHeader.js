import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/components/ui/CustomIcons";

const MobileHeader = () => {
  return (
    <div className="_header_mobile_menu">
      <div className="_header_mobile_menu_wrap">
        <div className="container">
          <div className="_header_mobile_menu">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="_header_mobile_menu_top_inner">
                  <div className="_header_mobile_menu_logo">
                    <Link href="/feed" className="_mobile_logo_link">
                      <Image
                        src="/assets/images/logo.svg"
                        alt="Image"
                        width={80}
                        height={30}
                        className="_nav_logo"
                      />
                    </Link>
                  </div>
                  <div className="_header_mobile_menu_right">
                    <form className="_header_form_grp">
                      <Link href="#" className="_header_mobile_search">
                        <Icons.Search />
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
