package com.gucci.cb.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.gucci.cb.domain.Book;
import com.gucci.cb.dto.BookDTO;
import com.gucci.cb.repository.BookRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BookServiceImpl implements BookService {
	
	private BookRepository bookRepository; 
	
	// 도서 정보 등록
	@Override
	public Book insert(Book book) {
		bookRepository.save(book);	
		return book;
	}
	
	// 전체 도서 조회
	@Override
	public List<Book> findAll() {
		List<Book> books = new ArrayList<Book>();
		bookRepository.findAll().forEach(e -> books.add(e));
		
		return books;
	}

	// 도서 상세 조회
	@Override
	@Transactional
	public Book findByNo(Long bookNo) {
		Book findBook = bookRepository.findById(bookNo)
				.orElseThrow(() -> new IllegalArgumentException("해당 도서가 존재하지 않습니다."));
		
		return findBook;
	}

	// 도서 정보 수정
	@Override
	@Transactional
	public void updateByNo(Long bookNo, BookDTO bookDto) {
		Book updateBook = bookRepository.findById(bookNo)
				.orElseThrow(() -> new IllegalArgumentException("해당 도서가 존재하지 않습니다."));	
		
		updateBook.update(bookDto.getTitle(), bookDto.getAuthor());
	}
	
	// 도서 삭제
	@Override
	public void deleteByNo(Long bookNo) {
		bookRepository.deleteById(bookNo);
	}

	

	
	
	
	
	
	
}
