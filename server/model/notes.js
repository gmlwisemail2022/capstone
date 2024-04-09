const knex = require("../db");

class Note {
  // Function to get all notes
  static async getAllNotes() {
    try {
      return await knex("notes").select("*");
    } catch (error) {
      throw error;
    }
  }

  // Function to create a new note
  static async createNote({ date, message, userId }) {
    try {
      console.log("Insertion of note to the database:", date, message, userId);
      const [noteId] = await knex("notes").insert({
        date,
        message,
        user_id: userId,
      });
      const newNote = { note_id: noteId, date, message, userId };
      console.log("Note inserted successfully:", newNote);
      return newNote; // Return the new note data
    } catch (error) {
      console.error("Error adding note:", error);
      throw error; // Rethrow the error to handle it in the controller
    }
  }

  // Function to update an existing note
  static async updateNote(noteId, newData) {
    try {
      await knex("notes").where({ note_id: noteId }).update(newData);
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }

  // Function to delete an existing note
  static async deleteNote(noteId) {
    try {
      await knex("notes").where({ note_id: noteId }).del();
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
}
module.exports = Note;
