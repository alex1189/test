package com.example.mydemoproject.controller;

import com.example.mydemoproject.model.Book;
import com.example.mydemoproject.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books/page/{pageNumber}")
    public HashMap getAllBooks(@PathVariable("pageNumber") Long pageNumber) {
            System.out.println("Get all books");
            Long start = (pageNumber -1)*5 ;
            List<Book> books = bookService.findAllBook(start);
            HashMap map = new HashMap();
            map.put("books", books);
            Long total = bookService.findTotal();
            map.put("total",total);
            return map;
    }

    @PostMapping("/books/create")
    public Book createBook(@Valid @RequestBody Book book) {
      bookService.saveBook(book);
      return book;
    }

    @GetMapping("/books/{id}")
    public Book getBook(@PathVariable("id") Long id) {
       return bookService.findBookById(id);
    }

    @PutMapping("/books/{id}")
    public void updateBook(@PathVariable("id") Long id, @RequestBody Book book) {
        System.out.println(id);
        System.out.println(book);
        book.setId(id);
        System.out.println(book.getId());
        bookService.updateBook(book);
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable("id") Long id) {
        bookService.deleteBook(id);
    }
}