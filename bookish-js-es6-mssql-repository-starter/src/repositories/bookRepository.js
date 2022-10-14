import { executeSql } from '../helpers/dbHelper.js';
import Book from '../models/book.js';

export default class BookRepository {
    async getAllBooks() {
        let result = await executeSql('SELECT * FROM books')

        let books = result.recordset;
        let bookArray = []

        for (let i = 0; i < books.length; i++) {
            let book = books[i];
            bookArray.push(new Book(book.id, book.title, book.author, book.isbn));
        }
        return bookArray;

        // use map instead
        // books.map
    }

    async getBookById(id) {
        console.log("get book " + id);
        let result = await executeSql('SELECT * FROM books WHERE id = @bookid', { 'bookid': id })

        let books = result.recordset;
        if (books.length < 1) {
            return null;
        }

        let book = books[0];
        return new Book(book.id, book.title, book.author, book.isbn);
    }

    async addBook() {
        //implement, need to find id of inserted book

        console.log("add book ");

        await executeSql('INSERT INTO books (author, title, isbn) VALUES (@author, @title, @isbn)', { 'author': 'Jane Austen', 'title': 'Pride and Prejudice', 'isbn': '9783548377989' })

        // discover identity / whole record query - find record made
    }

    async deleteBook(id) {
        console.log("delete book " + id);

        await executeSql('DELETE FROM copies WHERE id = @bookid', { 'bookid': id })
        await executeSql('DELETE FROM books WHERE id = @bookid', { 'bookid': id })
        //await executeSql('START TRANSACTION;; DELETE FROM copies WHERE id = @bookid DELETE FROM books WHERE id = @bookid; COMMIT;', { 'bookid': id })

        // do all or nothing, atomicity
        // research concept of a transaction - "unit of work": ACID Principles    
    }
}
