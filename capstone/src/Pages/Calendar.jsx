import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function Calendar() {
  // State for storing notes
  const [notes, setNotes] = useState([]);

  // Function to fetch notes from the database
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3100/notes"); // Adjust the endpoint accordingly
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Fetch notes when the component mounts

  // Function to handle adding a new note
  const handleAddNote = async (date, message) => {
    try {
      // Add your logic to save the note to the database
      // You'll need to send a POST request to your backend endpoint
      const username = localStorage.getItem("username"); // Retrieve authenticated user's ID from localStorage
      await axios.post("http://localhost:3100/notes", {
        date,
        message,
        username,
      }); // Adjust the endpoint accordingly
      // After successfully adding the note, fetch the updated notes
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Function to handle editing a note
  const handleEditNote = async (noteId, message) => {
    try {
      await axios.put(`http://localhost:3100/notes/${noteId}`, {
        message,
      });
      alert("Note updated successfully");
      fetchNotes(); // Refresh notes after updating
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Function to handle deleting a note
  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3100/notes/${noteId}`);
      alert("Note deleted successfully");
      fetchNotes(); // Refresh notes after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      {/* Render the calendar component */}
      <BigCalendar
        localizer={localizer}
        events={notes.map((note) => ({
          start: new Date(note.date),
          end: new Date(note.date),
          title: note.message,
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />

      {/* Form to add a new note */}
      <h2>Add Note</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const date = e.target.elements.date.value;
          const message = e.target.elements.message.value;
          handleAddNote(date, message);
          e.target.reset();
        }}
      >
        <div>
          <label>Date:</label>
          <input type="date" name="date" required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" required />
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}

export default Calendar;
