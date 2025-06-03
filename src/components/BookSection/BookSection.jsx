import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';

const BookSection = ({ sectionTitle, sectionDescription, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authenticatedFetch, isAdmin } = useAuth();

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:3000/api/books');
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();

        // Extract genres from the books
        const subjectsSet = new Set();
        console.log(data);
        
        data.docs.forEach(book => {
          if (book.genre) {
            subjectsSet.add(book.genre);
          }
        });

        setGenres(['All', ...Array.from(subjectsSet).slice(0, 10)]); // Limit to 10 genres for simplicity
        setBooks(data.docs.slice(0, 20)); // Limit books
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books by selected genre and search term
  const filteredBooks = books.filter(book => {
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handleBookAction = async (bookId, action) => {
    try {
      // This would be used for borrowing/reserving books
      const response = await authenticatedFetch(`http://localhost:3000/api/books/${bookId}/${action}`, {
        method: 'POST'
      });
      
      if (response.ok) {
        console.log(`${action} successful for book ${bookId}`);
        // You could update the UI here to show the book is borrowed/reserved
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await authenticatedFetch(`http://localhost:3000/api/books/${bookId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log(`Book ${bookId} deleted`);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      } else {
        const errorData = await response.json();
        console.error('Failed to delete book:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  

  if (loading) {
    return (
      <section className={`py-8 px-4 max-w-7xl mx-auto ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#641B2E] mx-auto"></div>
          <p className="mt-4">Loading books...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-8 px-4 max-w-7xl mx-auto ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-[#641B2E] text-[#FBDB93] px-4 py-2 rounded hover:bg-[#8A2B42]"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-8 px-4 max-w-7xl mx-auto ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="mb-6 text-center">
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {sectionTitle || 'Library Catalog'}
        </h2>
        {sectionDescription && (
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {sectionDescription}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books by title or author..."
          className={`w-full md:w-1/2 p-3 border rounded-lg transition-colors ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#641B2E]'
              : 'bg-white border-gray-300 text-gray-900 focus:border-[#641B2E]'
          } focus:outline-none focus:ring-2 focus:ring-[#641B2E]`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className={`w-full md:w-1/4 p-3 border rounded-lg transition-colors ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white focus:border-[#641B2E]'
              : 'bg-white border-gray-300 text-gray-900 focus:border-[#641B2E]'
          } focus:outline-none focus:ring-2 focus:ring-[#641B2E]`}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {filteredBooks.length} of {books.length} books
          {searchTerm && ` for "${searchTerm}"`}
          {selectedGenre !== 'All' && ` in ${selectedGenre}`}
        </p>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div
              key={book.id || index}
              className={`rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-white hover:bg-[#e6c5c1]'
              }`}
            >
              <div className="relative">
                <img
                  src={
                    book.coverUrl
                      ? book.coverUrl
                      : 'https://via.placeholder.com/150x200?text=No+Cover'
                  }
                  alt={book.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover';
                  }}
                />
                {book.genre && (
                  <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-200' 
                      : 'bg-[#641B2E] text-[#FBDB93]'
                  }`}>
                    {book.genre}
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className={`text-lg font-semibold mb-1 line-clamp-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {book.title}
                </h3>
                <p className={`text-sm mb-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  by {book.author}
                </p>
                
                {/* Action buttons - only show for authenticated users */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBookAction(book.id, 'borrow')}
                    className="flex-1 bg-[#641B2E] text-[#FBDB93] py-2 px-3 rounded text-sm hover:bg-[#8A2B42] transition-colors"
                  >
                    Borrow
                  </button>
                  <button
                    onClick={() => handleBookAction(book.id, 'reserve')}
                    className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${
                      darkMode
                        ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Reserve
                  </button>
                </div>
                
                {/* Admin actions */}
                {isAdmin() && (
                  <div className="mt-2 pt-2 border-t border-gray-300">
                    <button
                      onClick={() => console.log('Edit book:', book.id)}
                      className="text-xs text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                      <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>

                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No books found matching your criteria.
            </p>
            {(searchTerm || selectedGenre !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('All');
                }}
                className="mt-2 text-[#641B2E] hover:text-[#8A2B42] underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;