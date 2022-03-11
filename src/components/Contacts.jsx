import React, { useState, useEffect } from "react";
import "../css/Global.css";
import NavBar from "./NavBar";
import "../css/Contacts.css";
import ContactDataModel from "../models/ContactDataModel";
import ContactItem from "./ContactItem";
import { SERVER_BASE_URL } from "../Constants";

function Contacts(props) {
  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContactsJSON() {
    const response = await fetch(`${SERVER_BASE_URL}/api/contacts?populate=*`);
    const contacts = await response.json();
    return contacts;
  }

  const fetchContacts = () => {
    fetchContactsJSON()
      .then((json) => {
        const contacts = json.data;
        if (contacts.length > 0) {
          let fetchedContacts = [];
          contacts.map((contact) => {
            const id = contact.id;
            const attributes = contact.attributes;
            const name = attributes.name;
            const phone = attributes.phone;
            const email = attributes.email;
            const dpRelativeURL =
              attributes.dp.data.attributes.formats.thumbnail.url;
            const dp = `${SERVER_BASE_URL}${dpRelativeURL}`;
            const contactDataModel = new ContactDataModel(
              id,
              name,
              phone,
              email,
              dp
            );
            fetchedContacts = [...fetchedContacts, contactDataModel];
          });
          setContacts(fetchedContacts);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [contacts, setContacts] = useState([]);

  return (
    <div className="springboard-app-container">
      <NavBar title="Contacts" onBackButtonClick={props.onBackButtonClick} />
      <div className="springboard-app-content-container">
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

export default Contacts;
