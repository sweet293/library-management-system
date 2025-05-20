import React, { useEffect, useState } from 'react';

const BookSection = ({ sectionTitle, sectionDescription, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState(() => {
    const searching = localStorage.getItem('searchTerm');
    return searching ? JSON.parse(searching) : '';
  });

  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState(['All']);

  // Save search term in localStorage
  useEffect(() => {
    localStorage.setItem('searchTerm', JSON.stringify(searchTerm));
  }, [searchTerm]);

  // Fetch books from Open Library API
  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchTerm.trim()) {
        setBooks([]);
        return;
      }

      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        // Extract genres from subjects
        const subjectsSet = new Set();
        data.docs.forEach(doc => {
          if (doc.subject) {
            doc.subject.slice(0, 3).forEach(subject => subjectsSet.add(subject)); // Limit genres per book
          }
        });

        setGenres(['All', ...Array.from(subjectsSet).slice(0, 10)]); // Limit to 10 genres for simplicity
        setBooks(data.docs.slice(0, 20)); // Limit books
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  // Filter books by selected genre (subject)
  const filteredBooks = books.filter(book => {
    if (selectedGenre === 'All') return true;
    return book.subject?.includes(selectedGenre);
  });

  return (
    <section className={`py-8 px-4 max-w-7xl mx-auto ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="mb-6 text-center">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{sectionTitle}</h2>
        {sectionDescription && (
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{sectionDescription}</p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          className={`w-full md:w-1/2 p-2 border rounded-md ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className={`w-full md:w-1/4 p-2 border rounded-md ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl hover:shadow-2xl hover:bg-[#e6c5c1] transition overflow-hidden"
            >
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : 'https://via.placeholder.com/150x200?text=No+Cover'
                }
                alt={book.title}
                className="w-full h-74 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-500">by {book.author_name?.join(', ') || 'Unknown'}</p>
                {book.subject && (
                  <span className="text-xs bg-[#b9b6b7] text-black px-2 py-0.5 rounded mt-2 inline-block">
                    {book.subject[0]}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No books found.</p>
        )}
      </div>
    </section>
  );
};

export default BookSection;
