import { seedUsers, seedNotes, seedTags } from '../data/mockDatabase';

const STORAGE_KEYS = {
  NOTES: 'lumina_notes',
  USERS: 'lumina_users',
  TAGS: 'lumina_tags',
  RECENTLY_VIEWED: 'lumina_recently_viewed',
  UPVOTED_NOTES: 'lumina_upvoted_notes'
};

// Initialize DB safely
export const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(seedNotes));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(seedUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TAGS)) {
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(seedTags));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED)) {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.UPVOTED_NOTES)) {
    localStorage.setItem(STORAGE_KEYS.UPVOTED_NOTES, JSON.stringify([]));
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS[key]);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return null;
  }
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};
