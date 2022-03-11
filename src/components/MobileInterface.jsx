import React, { useEffect, useState } from "react";
import LockScreen from "./LockScreen";
import UnlockScreen from "./UnlockScreen";
import "../css/Global.css";
import $ from "jquery";
import { isMobile } from "react-device-detect";

function MobileInterface() {
  useEffect(() => {
    if (!isMobile) {
      $(".iphone-screen-container").addClass(
        "absolute-position absolute-width-height"
      );
    } else {
      $(".iphone-screen-container").addClass("full-width-height");
    }
    if (!isMobile) {
      $(".phone-frame").addClass("mobile-frame-background");
    } else {
      $("html").addClass("full-width-height");
      $(document.body).addClass("full-width-height");
      $("#root").addClass("full-width-height");
      $(".phone-frame").addClass("full-width-height");
    }
  }, []);

  const [unlocked, setUnlocked] = useState(false);

  const onUnlock = () => {
    setUnlocked(true);
  };

  return (
    <div className="phone-frame">
      <LockScreen hidden={unlocked} onUnlock={onUnlock} />
      <UnlockScreen hidden={!unlocked} />
    </div>
  );
}

export default MobileInterface;
