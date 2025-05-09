import React from 'react';
import { getBooksData } from '../../data/BooksDetails'; 

const BookSection = ({ sectionTitle, sectionDescription }) => {
  const books = getBooksData();

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">{sectionTitle}</h2>
        {sectionDescription && (
          <p className="mt-2 text-gray-600 text-sm">{sectionDescription}</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow rounded-xl p-3 hover:shadow-2xl hover:bg-[#b2c6dc] transition">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
            <p className="text-sm text-gray-500">by {book.author}</p>
            <span className="text-xs bg-[#a9c2dc] text-[#123458] px-2 py-0.5 rounded mt-1 inline-block">
              {book.genre}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookSection;
