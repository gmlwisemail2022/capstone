import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function Calendar() {
  // State for storing notes
  const [notes, setNotes] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  // Function to fetch notes from the database
  const fetchNotes = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.get(
        process.env.REACT_APP_SERVER_API + "/notes/" + username
        //`http://localhost:3100/notes/${username}`
      );
      console.log("FE-notes", response);
      const formattedNotes = response.data.map((note) => ({
        ...note,
        start: moment(`${note.date} ${note.time}`, "YYYY-MM-DD HH:mm").toDate(),
        end: moment(`${note.date} ${note.time}`, "YYYY-MM-DD HH:mm").toDate(),
        title: note.message,
      }));
      setNotes(formattedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Fetch notes when the component mounts

  // Function to handle adding a new note
  const handleAddNote = async (date, time, message) => {
    try {
      const username = localStorage.getItem("username");
      await axios.post(process.env.REACT_APP_SERVER_API + "/notes", {
        date,
        time,
        message,
        username,
      }); // Adjust the endpoint accordingly
      setAlertMessage("Note created successfully");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Function to handle editing a note
  const handleEditNote = async (note) => {
    try {
      const newMessage = prompt(
        "Enter the new message for this note:",
        note.message
      );
      if (newMessage !== null) {
        await axios.put(
          process.env.REACT_APP_SERVER_API + "/notes/" + note.note_id,
          {
            message: newMessage,
          }
        );
        setAlertMessage("Note updated successfully");
        fetchNotes();
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Function to handle deleting a note
  const handleDeleteNote = async (note) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this note?"
      );
      if (confirmDelete) {
        await axios.delete(
          process.env.REACT_APP_SERVER_API + "/notes/" + note.note_id
        );
        setAlertMessage("Note deleted successfully");
        fetchNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      {/* Render the calendar component */}
      <BigCalendar
        localizer={localizer}
        events={notes}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => {
          const action = prompt(
            "Edit or Delete the note? type 'e' for edit or 'd' for delete)"
          );
          if (action !== null) {
            if (action.toLowerCase() === "e") {
              handleEditNote(event);
            } else if (action.toLowerCase() === "d") {
              handleDeleteNote(event);
            } else {
              alert(
                "Invalid action. Please enter 'e' for edit or 'd' for 'delete'."
              );
            }
          }
        }}
      />

      {/* Form to add a new note */}
      <h2>Add Note</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const date = e.target.elements.date.value;
          const time = e.target.elements.time.value;
          const message = e.target.elements.message.value;
          handleAddNote(date, time, message);
          e.target.reset();
        }}
      >
        <div>
          <label>Date:</label>
          <input type="date" name="date" required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" required />
        </div>
        <button type="submit">Add Note</button>
      </form>
      {alertMessage && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default Calendar;
