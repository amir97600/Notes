import React, { useState, useEffect } from "react";
import CreateNote from "./CreateNote";
import "./Notes.css";
import { v4 as uuid } from "uuid";
import Note from "./Note";

const Notes = () => {
  const [inputText, setInputText] = useState(" ");
  const [notes, setNotes] = useState([]);
  const [editToogler, setEdit] = useState(null);

  const deleteHandler = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  const editHandler = (id, text) => {
    setEdit(id);
    setInputText(text);
  };
  const saveHandler = () => {
    if (editToogler) {
      setNotes(
        notes.map((note) =>
          note.id === editToogler ? { ...note, text: inputText } : note
        )
      );
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
    }
    setInputText("");
    setEdit(null);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="notes">
      {editToogler === null ? (
        <CreateNote
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        ></CreateNote>
      ) : (
        <></>
      )}

      {notes.map((note) =>
        editToogler === note.id ? (
          <CreateNote
            key={editToogler}
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
          ></CreateNote>
        ) : (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          ></Note>
        )
      )}
    </div>
  );
};

export default Notes;
