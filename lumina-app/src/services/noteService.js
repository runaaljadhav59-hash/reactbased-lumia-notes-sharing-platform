import { initLocalStorage, getFromLocalStorage, saveToLocalStorage } from './localStorage';

// Ensure DB is seeded on first load
initLocalStorage();

// Helper to simulate network latency
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const mapNoteAuthors = (notes) => {
  const users = getFromLocalStorage('USERS');
  return notes.map(note => ({
    ...note,
    author: users.find(u => u.id === note.authorId)
  }));
};

export const getCurrentUser = async () => {
   // Simulated active user
   const users = getFromLocalStorage('USERS');
   return users.find(u => u.id === 'usr_runaal');
};

export const getAllNotes = async () => {
  await delay(600);
  const notes = getFromLocalStorage('NOTES');
  return mapNoteAuthors(notes).sort((a,b) => b.createdAt - a.createdAt);
};

export const getNoteById = async (id) => {
  await delay(400);
  const notes = getFromLocalStorage('NOTES');
  const note = notes.find(n => n.id === id);
  if (!note) throw new Error("Note not found");
  
  // Update recently viewed
  const recent = getFromLocalStorage('RECENTLY_VIEWED');
  const updatedRecent = [id, ...recent.filter(item => item !== id)].slice(0, 5);
  saveToLocalStorage('RECENTLY_VIEWED', updatedRecent);

  return mapNoteAuthors([note])[0];
};

export const searchNotes = async (query) => {
  await delay(300);
  const notes = getFromLocalStorage('NOTES');
  const lowerQuery = query.toLowerCase();
  const searchResults = notes.filter(n => 
    n.title.toLowerCase().includes(lowerQuery) || 
    n.excerpt.toLowerCase().includes(lowerQuery) ||
    n.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
  return mapNoteAuthors(searchResults);
};

export const sortNotes = async (notesArg, type) => {
  const notes = [...notesArg];
  switch (type) {
    case 'Newest':
      return notes.sort((a, b) => b.createdAt - a.createdAt);
    case 'Most Upvoted':
      return notes.sort((a, b) => b.upvotes - a.upvotes);
    case 'Trending':
    default:
      // Simplified trending algorithm: combination of upvotes and recency
      return notes.sort((a, b) => (b.upvotes + (b.createdAt / 1000000000)) - (a.upvotes + (a.createdAt / 1000000000)));
  }
};

export const upvoteNote = async (id) => {
  await delay(200);
  const upvotedMap = getFromLocalStorage('UPVOTED_NOTES');
  
  // if already upvoted, we won't allow double voting in this simulation
  if (upvotedMap.includes(id)) {
     return { success: false, message: 'Already upvoted' };
  }

  const notes = getFromLocalStorage('NOTES');
  const noteIndex = notes.findIndex(n => n.id === id);
  
  if (noteIndex === -1) throw new Error("Note not found");

  // Increment upvote
  notes[noteIndex].upvotes += 1;
  saveToLocalStorage('NOTES', notes);
  
  // Save to user's upvoted array
  saveToLocalStorage('UPVOTED_NOTES', [...upvotedMap, id]);

  return { success: true, newCount: notes[noteIndex].upvotes };
};

export const getRecentlyViewed = async () => {
   await delay(300);
   const recentIds = getFromLocalStorage('RECENTLY_VIEWED');
   const notes = getFromLocalStorage('NOTES');
   const recentNotes = recentIds.map(id => notes.find(n => n.id === id)).filter(Boolean);
   return mapNoteAuthors(recentNotes);
};

export const getUserNotes = async (userId) => {
   await delay(500);
   const notes = getFromLocalStorage('NOTES');
   const userNotes = notes.filter(n => n.authorId === userId);
   return mapNoteAuthors(userNotes);
};
