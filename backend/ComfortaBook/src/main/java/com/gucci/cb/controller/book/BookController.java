package com.gucci.cb.controller.book;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gucci.cb.domain.book.Book;
import com.gucci.cb.domain.user.UserBooks;
import com.gucci.cb.dto.book.BookDTO;
import com.gucci.cb.service.book.BookService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
@Api(tags = {"Book"})
public class BookController {
	
	private final BookService bookService;
	
	// 도서 정보 등록
	@ApiOperation(value = "도서 정보 등록", response = Book.class)
	@PostMapping("/insert")
	public ResponseEntity<Book> insertBook(@RequestBody Book book) {
		return new ResponseEntity<Book>(bookService.insert(book), HttpStatus.OK);
	}
	
	// 전체 도서 조회
	@ApiOperation(value = "전체 도서 조회", response = List.class)
	@GetMapping("/list")
	public ResponseEntity<Page<Book>> retrieveBook(final Pageable pageable) {
//		Page<Book> books = bookRepository.findAll(pageable);
//		return new ResponseEntity<Page<Book>>(books, HttpStatus.OK);
		
		return new ResponseEntity<Page<Book>>(bookService.findAll(pageable), HttpStatus.OK);
		
//		List<Book> books = bookService.findAll();
//		return new ResponseEntity<List<Book>>(books, HttpStatus.OK);
	}
	
	// 도서 상세 조회
	@ApiOperation(value = "도서 상세 조회", response = Book.class)
	@GetMapping("/detail/{bookNo}")
	public ResponseEntity<Book> detailBook(@PathVariable("bookNo") Long bookNo){
		return new ResponseEntity<Book>(bookService.findByNo(bookNo), HttpStatus.OK);
	}
	
	// 도서 정보 수정
	@ApiOperation(value = "도서 정보 수정", response = BookDTO.class)
    @PutMapping("/update/{bookNo}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable("bookNo") Long bookNo, @RequestBody BookDTO bookDto) {
        bookService.updateByNo(bookNo, bookDto);
        return new ResponseEntity<BookDTO>(bookDto, HttpStatus.OK);
    }
	
	// 도서 삭제
	@ApiOperation(value = "도서 삭제")
	@DeleteMapping("/delete/{bookNo}")
	public ResponseEntity<Void> deleteBook(@PathVariable("bookNo") Long bookNo){
		bookService.delete(bookNo);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	// 내 도서 등록
	@ApiOperation(value = "내 도서 등록", response = Book.class)
	@PostMapping("/insertMyBook")
	public ResponseEntity<UserBooks> insertMyBook(@RequestBody UserBooks userBooks) {
		return new ResponseEntity<UserBooks>(bookService.insertByNo(userBooks), HttpStatus.OK);
	}
	
	// 내 도서 삭제
	@ApiOperation(value = "내 도서 삭제")
	@DeleteMapping("/deleteMyBook/u={userNo}&b={bookNo}")
	public ResponseEntity<Void> deleteMyBook(@PathVariable("userNo") Long userNo, @PathVariable("bookNo") Long bookNo){
		bookService.deleteByNo(userNo, bookNo);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
}
