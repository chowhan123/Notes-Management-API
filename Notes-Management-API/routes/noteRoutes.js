import express from "express";
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

// Ensure these paths work correctly with `/api/notes` in index.js
router.post("/", createNote); // Add a new note
router.get("/", getAllNotes); // Get all notes
router.get("/:id", getNoteById); // Get note by ID
router.put("/:id", updateNote); // Update note
router.delete("/:id", deleteNote); // Delete note

export default router;


