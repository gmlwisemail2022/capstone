const Note = require("../model/notes");
const User = require("../model/user");
const express = require("express");

// Function to list notes by specific user
async function listNotes(req, res) {
  try {
    const { username } = req.params;
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = user.user_id;
    const notes = await Note.getNotesByUserId(userId);
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to add a new note
async function addNote(req, res) {
  try {
    const { date, time, message, username } = req.body;
    // Retrieve user_id based on username
    const user = await User.findByUsername(username);
    const userId = user.user_id;
    // Add the note using the retrieved userId
    const noteData = {
      date: date,
      time: time,
      message: message,
      user_id: userId,
    };

    await Note.createNote(noteData);
    console.log("Note saved in database", noteData);
    // Send a success response with the new note data
    res.status(200).json({
      message: "Note created successfully",
    });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to edit an existing note
async function editNote(req, res) {
  try {
    const { noteId } = req.params;
    const { message } = req.body;
    await Note.updateNote(noteId, { message });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error editing note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to delete an existing note
async function deleteNote(req, res) {
  try {
    const { noteId } = req.params;
    await Note.deleteNote(noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  listNotes,
  addNote,
  editNote,
  deleteNote,
};
