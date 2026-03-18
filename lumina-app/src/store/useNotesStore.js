import { create } from 'zustand';
import { seedNotes, seedUsers } from '../data/mockDatabase';

const STORAGE_KEY = 'lumina_app_state';

// Try to load initial state from localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading state', e);
  }
  return {
    notes: seedNotes,
    currentUser: seedUsers.find(u => u.id === 'usr_runaal'),
  };
};

export const useNotesStore = create((set, get) => ({
  ...loadState(),

  // Sync state to localStorage automatically after every action
  syncStorage: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      notes: get().notes,
      currentUser: get().currentUser
    }));
  },

  addNote: (newNote) => {
    set((state) => ({ notes: [newNote, ...state.notes] }));
    get().syncStorage();
  },

  updateNote: (id, updatedFields) => {
    set((state) => ({
      notes: state.notes.map(note => 
        note.id === id ? { ...note, ...updatedFields } : note
      )
    }));
    get().syncStorage();
  },

  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter(note => note.id !== id)
    }));
    get().syncStorage();
  },

  upvoteNote: (id) => {
    set((state) => ({
      notes: state.notes.map(note =>
        note.id === id ? { ...note, upvotes: note.upvotes + 1 } : note
      )
    }));
    get().syncStorage();
  },

  updateProfile: (updatedFields) => {
    set((state) => ({
      currentUser: { ...state.currentUser, ...updatedFields }
    }));
    get().syncStorage();
  }
}));
