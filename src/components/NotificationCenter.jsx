import React, { useState, useEffect } from "react";
import SafariLogo from "../assets/icon_safari.png";
import NotificationItemDataModel from "../models/NotificationItemDataModel";
import "../css/NotificationCenter.css";
import NotificationCenterItem from "./NotificationCenterItem";
import { SERVER_BASE_URL } from "../Constants";

function NotificationCenter() {
  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotificationsJSON() {
    const response = await fetch(`${SERVER_BASE_URL}/api/notifications`);
    const notes = await response.json();
    return notes;
  }

  const fetchNotifications = () => {
    fetchNotificationsJSON()
      .then((json) => {
        const notifications = json.data;
        if (notifications.length > 0) {
          let fetchedNotifications = [];
          notifications.map((notification) => {
            const id = notification.id;
            const attributes = notification.attributes;
            const title = attributes.title;
            const subtitle = attributes.subtitle;
            const url = attributes.url;
            const notificationDataModel = new NotificationItemDataModel(
              id,
              title,
              subtitle,
              url,
              SafariLogo
            );
            fetchedNotifications = [
              ...fetchedNotifications,
              notificationDataModel,
            ];
          });
          setItems(fetchedNotifications);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [items, setItems] = useState([]);

  return (
    <div hidden={items.length == 0} className="notification-center-container">
      <div hidden={items.length == 0} className="notification-center">
        {items.map((item) => (
          <NotificationCenterItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default NotificationCenter;
