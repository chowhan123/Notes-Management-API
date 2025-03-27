import Note from "../models/noteModel.js";

// GET all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notes", error: error.message });
  }
};

// GET note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid note ID", error: error.message });
  }
};

// ADD a new note
export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const note = new Note({ title, description });
    await note.save();
    res.status(201).json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating note", error: error.message });
  }
};

// UPDATE note
export const updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, message: "Note updated successfully", updatedNote });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid note ID", error: error.message });
  }
};

// DELETE note
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ success: false, message: "Note not found" });

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid note ID", error: error.message });
  }
};
