import React, { useState } from 'react';
import { getBooksData } from '../../data/BooksDetails'; 

const BookSection = ({ sectionTitle, sectionDescription, darkMode}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  const books = getBooksData();
  const genres = ['All', ...new Set(books.map(book => book.genre))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <section className={`py-8 px-4 max-w-7xl mx-auto ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="mb-6 text-center">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{sectionTitle}</h2>
        {sectionDescription && (
          <p className={`mt-2 text-gray-600 text-sm ${darkMode ?  'text-gray-600' : 'text-gray-300'}`}>{sectionDescription}</p>
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
    filteredBooks.map((book) => (
      <div
        key={book.id}
        className="bg-white shadow rounded-xl hover:shadow-2xl hover:bg-[#e6c5c1] transition overflow-hidden"
      >
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-74 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          <p className="text-sm text-gray-500">by {book.author}</p>
          <span className="text-xs bg-[#b9b6b7] text-black px-2 py-0.5 rounded mt-2 inline-block">
            {book.genre}
          </span>
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
