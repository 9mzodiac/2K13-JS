import React, { useState, useEffect, useRef } from "react";
import "../css/LockScreen.css";
import "../css/Global.css";
import $ from "jquery";
import "jquery-ui-bundle";
//import "jquery-ui-touch-punch";
import NotificationCenter from "./NotificationCenter";

function LockScreen(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const interval = useRef(null);

  useEffect(() => {
    lockSlider();
    renderDateTime();
    interval.current = setInterval(() => renderDateTime(), 60 * 1000);
    // Cleanup
    return clearDateTimeInterval;
  }, []);

  const clearDateTimeInterval = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  const lockSlider = () => {
    // Set the slider to be sliding
    $(".unlock-slider").slider({
      handle: ".unlock-handle",
      animate: true,
      slide: function (e, ui) {
        $(".slide-to-unlock").css(
          "opacity",
          1 - parseInt($(".unlock-handle").css("left")) / 120
        );
        if ($(".unlock-handle").position().left >= 205) {
          props.onUnlock();
          clearDateTimeInterval();
        }
      },
      stop: function (e, ui) {
        $(".unlock-handle").animate({ left: 0 }, 200);
        $(".slide-to-unlock").animate({ opacity: 1 }, 200);
      },
    });
  };

  const renderDateTime = () => {
    console.log("Render date time");
    // Set the date and time
    let dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let currentDay = date.getDay();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth();
    let currentHour = date.getHours();
    let currentMin = date.getMinutes();

    setDate(
      `${dayNames[currentDay]}, ${monthNames[currentMonth]} ${currentDate}`
    );

    if (currentHour < 10) {
      currentHour = `0${currentHour}`;
    }
    if (currentMin < 10) {
      currentMin = `0${currentMin}`;
    }
    setTime(`${currentHour}:${currentMin}`);
  };

  return (
    <div hidden={props.hidden} className="iphone-screen-container">
      <div className="iphone-inside">
        <div className="unlock-top">
          <p className="time">{time}</p>
          <p className="date">{date}</p>
        </div>
        <div className="unlock-spacer">
          <NotificationCenter />
        </div>
        <div className="unlock-bottom-container">
          <div className="unlock-bottom-extension"></div>
          <div className="unlock-bottom">
            <div className="slide-to-unlock"></div>
            <div className="unlock-slider-wrapper">
              <div className="unlock-slider">
                <div className="unlock-handle ui-slider-handle"></div>
              </div>
            </div>
          </div>
          <div className="unlock-bottom-extension"></div>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;