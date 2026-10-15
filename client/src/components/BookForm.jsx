import React, { useState } from 'react';

/**
 * BookForm Component
 * Renders inputs for title and author with client-side validation,
 * inline error messages, and loading state during submission.
 */
export default function BookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required and cannot be empty.';
    }
    if (!author.trim()) {
      newErrors.author = 'Author is required and cannot be empty.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const success = await onAddBook(title.trim(), author.trim());
      if (success) {
        setTitle('');
        setAuthor('');
        setErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    if (errors.author) {
      setErrors((prev) => ({ ...prev, author: '' }));
    }
  };

  const inputClass = (hasError) =>
    `w-full px-3 py-2 text-sm bg-white border rounded outline-none focus:border-stone-700 disabled:bg-stone-100 ${
      hasError ? 'border-red-600' : 'border-stone-300'
    }`;

  return (
    <div className="bg-white border border-stone-300 rounded p-5">
      <h2 className="text-lg font-semibold text-stone-900">Add a New Book</h2>
      <p className="text-sm text-stone-600 mb-4">Record a book you're reading or want to read</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="book-title" className="block text-sm font-medium mb-1">
            Book Title <span className="text-red-600">*</span>
          </label>
          <input
            id="book-title"
            name="title"
            type="text"
            placeholder="e.g. The Pragmatic Programmer"
            value={title}
            onChange={handleTitleChange}
            disabled={isSubmitting}
            className={inputClass(errors.title)}
          />
          {errors.title && <p className="text-red-700 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="book-author" className="block text-sm font-medium mb-1">
            Author <span className="text-red-600">*</span>
          </label>
          <input
            id="book-author"
            name="author"
            type="text"
            placeholder="e.g. Andrew Hunt & David Thomas"
            value={author}
            onChange={handleAuthorChange}
            disabled={isSubmitting}
            className={inputClass(errors.author)}
          />
          {errors.author && <p className="text-red-700 text-sm mt-1">{errors.author}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white text-sm cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}
