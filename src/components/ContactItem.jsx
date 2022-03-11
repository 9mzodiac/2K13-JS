import React from "react";
import "../css/ContactItem.css";

function ContactItem(props) {
  return (
    <div className="contact-item-container">
      <div className="contact-item-vertical-container">
        <div className="contact-item-details-container">
          <img src={props.contact.dp} className="contact-item-dp"></img>
          <div className="contact-details-container">
            <span>{props.contact.name}</span>
            <span className="contact-item-email">{props.contact.email}</span>
          </div>
        </div>
        <div className="contact-item-separator"></div>
      </div>
    </div>
  );
}

export default ContactItem;
