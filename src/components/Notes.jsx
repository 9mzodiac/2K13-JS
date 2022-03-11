import React, { useState, useEffect } from "react";
import "../css/Global.css";
import NavBar from "./NavBar";
import "../css/Notes.css";
import NotesDataModel from "../models/NotesDataModel";
import Moment from "moment";
import { SERVER_BASE_URL } from "../Constants";

function Notes(props) {
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotesJSON() {
    const response = await fetch(`${SERVER_BASE_URL}/api/notes`);
    const notes = await response.json();
    return notes;
  }

  const fetchNotes = () => {
    fetchNotesJSON()
      .then((json) => {
        const notes = json.data;
        if (notes.length > 0) {
          let fetchedNotes = [];
          notes.map((note) => {
            const text = note.attributes.text;
            const dated = note.attributes.dated;
            if (dated != null) {
              var datedStr = Moment(dated).format("MMMM DD, YYYY");
            }
            const noteDataModel = new NotesDataModel(text, datedStr);
            fetchedNotes = [...fetchedNotes, noteDataModel];
          });
          setNotes(fetchedNotes);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [notes, setNotes] = useState([]);

  return (
    <div className="springboard-app-container">
      <NavBar
        title="Notes"
        onBackButtonClick={props.onBackButtonClick}
        dark={true}
      />
      <div className="springboard-app-content-container">
        <div className="notes-paper">
          <div className="notes-pattern">
            <div className="notes-content">
              {notes.map((note, index) => {
                const shouldShowDate = note.dated != null;
                return (
                  <React.Fragment key={index}>
                    {shouldShowDate && (
                      <p className="note-item-date">{note.dated}</p>
                    )}
                    {shouldShowDate && <br />}
                    {note.text}
                    <br />
                    <br />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
