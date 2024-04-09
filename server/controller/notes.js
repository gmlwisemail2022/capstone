const Note = require("../model/notes");
const User = require("../model/user");
const express = require("express");

// Function to list all notes
async function listAllNotes(req, res) {
  try {
    const notes = await Note.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to add a new note
async function addNote(req, res) {
  try {
    const { date, message, username } = req.body;
    // Retrieve user_id based on username
    const user = await User.findByUsername(username);
    const userId = user.user_id;
    // Add the note using the retrieved userId
    const newNote = await Note.createNote({
      date,
      message,
      userId,
    });
    // Send a success response with the new note data
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to edit an existing note
async function editNote(req, res) {
  try {
    const { id } = req.params;
    const { message } = req.body;
    await Note.updateNote(id, { message });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error editing note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Function to delete an existing note
async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    await Note.deleteNote(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  listAllNotes,
  addNote,
  editNote,
  deleteNote,
};
