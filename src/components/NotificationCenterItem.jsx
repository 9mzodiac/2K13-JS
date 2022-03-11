import React from "react";
import "../css/NotificationCenterItem.css";

function NotificationCenterItem(props) {
  const { item } = props;
  const openURL = () => {
    window.open(item.url, "_blank");
  };
  return (
    <button onClick={openURL} className="notification-center-item-button">
      <div className="notification-center-item-container">
        <img className="notification-center-item-image" src={item.image} />
        <div className="notification-center-item-text-container">
          <p className="notification-center-item-title">{item.title}</p>
          <p className="notification-center-item-subtitle">{item.subtitle}</p>
        </div>
      </div>
    </button>
  );
}

export default NotificationCenterItem;
