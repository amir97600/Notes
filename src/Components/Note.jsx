import React from "react";

const Note = ({ id, text, editHandler, deleteHandler }) => {
  return (
    <div className="note">
      <div className="note_body">{text}</div>
      <div className="note_footer" style={{ justifyContent: "flex-end" }}>
        <button className="note_save m-2" onClick={() => deleteHandler(id)}>
          Delete 
        </button>
        <button className="note_save" onClick={() => editHandler(id, text)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Note;
