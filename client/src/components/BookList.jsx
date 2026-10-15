import React from 'react';
import BookItem from './BookItem';

/**
 * BookList Component
 * Displays the reading list, loading message, or an empty state message.
 */
export default function BookList({ books, isLoading, onMarkAsRead, onDeleteBook }) {
  if (isLoading) {
    return <p className="text-stone-600">Loading books...</p>;
  }

  if (!books || books.length === 0) {
    return (
      <div className="bg-white border border-stone-300 rounded p-6 text-center">
        <h3 className="font-semibold text-stone-900 mb-1">No books yet</h3>
        <p className="text-sm text-stone-600">
          Your reading shelf is empty. Add a book using the form above to start building your personal library!
        </p>
      </div>
    );
  }

  const readCount = books.filter((b) => b.status === 'read').length;
  const unreadCount = books.length - readCount;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-stone-900">
          Your Bookshelf <span className="text-sm font-normal text-stone-500">({books.length})</span>
        </h2>
        <p className="text-sm text-stone-600">
          {readCount} read, {unreadCount} unread
        </p>
      </div>

      <ul className="space-y-2" role="list" aria-label="Book list">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onMarkAsRead={onMarkAsRead}
            onDeleteBook={onDeleteBook}
          />
        ))}
      </ul>
    </div>
  );
}
