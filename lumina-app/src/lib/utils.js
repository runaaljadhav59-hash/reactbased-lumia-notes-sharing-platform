import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution.
 * Combines clsx (conditional class joining) with tailwind-merge (deduplication).
 *
 * @param  {...(string|Object|Array)} inputs - Class values, objects, or arrays
 * @returns {string} Merged class string
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-violet-500', 'px-6')
 * // Result: 'py-2 px-6 bg-violet-500' (px-4 properly overridden by px-6)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string into a human-readable relative time.
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 */
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

/**
 * Truncate text to a specified length with ellipsis.
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum character length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Get time-based greeting.
 * @param {string} name - User's display name
 * @returns {string} Greeting string based on current time of day
 */
export function getGreeting(name) {
  const hour = new Date().getHours();

  if (hour < 5) return `Burning the midnight oil, ${name}`;
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 17) return `Good afternoon, ${name}`;
  if (hour < 21) return `Good evening, ${name}`;
  return `Good night, ${name}`;
}
