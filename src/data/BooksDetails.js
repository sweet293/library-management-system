const books = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
      genre: 'Dystopian',
    },
    {
      id: 2,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverUrl: 'https://covers.openlibrary.org/b/id/8081536-L.jpg',
      genre: 'Romance',
    },
    {
      id: 3,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      coverUrl: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
      genre: 'Fantasy',
    },
    {
      id: 4,
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      coverUrl: 'https://covers.openlibrary.org/b/id/8225631-L.jpg',
      genre: 'Dystopian',
    },
  ];
  
  
const getBooksData = () => {
    return books;
  }
  
  export {getBooksData};