import React, { useState } from 'react';

/**
 * BookItem Component
 * Renders an individual book with title, author, status badge,
 * "Mark as read" button (disabled when read), and "Delete" button.
 */
export default function BookItem({ book, onMarkAsRead, onDeleteBook }) {
  const [isMarking, setIsMarking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isRead = book.status === 'read';

  const handleMarkRead = async () => {
    if (isRead || isMarking) return;
    try {
      setIsMarking(true);
      await onMarkAsRead(book.id);
    } finally {
      setIsMarking(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      await onDeleteBook(book.id);
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date cleanly
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <li className="bg-white border border-stone-300 rounded p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold truncate ${isRead ? 'line-through text-stone-400' : 'text-stone-900'}`}
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-sm text-stone-600">
            by {book.author}
            {formattedDate && <span> · Added {formattedDate}</span>}
          </p>
          <p className={`text-sm mt-1 ${isRead ? 'text-green-700' : 'text-amber-700'}`}>
            {isRead ? 'Read' : 'Unread'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isRead ? (
            <button
              type="button"
              onClick={handleMarkRead}
              disabled={isMarking || isDeleting}
              className="px-3 py-1.5 rounded border border-stone-400 text-sm text-stone-800 hover:bg-stone-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Mark "${book.title}" as read`}
            >
              {isMarking ? 'Updating...' : 'Mark as read'}
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded border border-stone-300 text-sm text-stone-400 cursor-not-allowed"
              aria-label="Already read"
            >
              Read
            </button>
          )}

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting || isMarking}
            className="px-3 py-1.5 rounded border border-red-300 text-sm text-red-700 hover:bg-red-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Delete "${book.title}"`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </li>
  );
}
