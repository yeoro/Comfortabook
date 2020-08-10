package com.gucci.cb.service.book;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gucci.cb.domain.book.Book;
import com.gucci.cb.domain.book.BookContents;
import com.gucci.cb.dto.book.BookDTO;
import com.gucci.cb.repository.book.BookContentsRepository;
import com.gucci.cb.repository.book.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

	private final BookRepository bookRepository; 

	private final BookContentsRepository BookContentsRepository;

	// 도서 정보 등록
	@Override
	public Book insert(Book book) {
		bookRepository.save(book);

		String desc = book.getDescription();
		String isbn = book.getIsbn();

		String curContent = "";
		StringTokenizer st = new StringTokenizer(desc, ".");

		int pageNo = 1;
		int limit = 5;
		int size = 0;

		while(st.hasMoreElements()) {
			String temp = st.nextToken();
			size += temp.length();
			
			if(size >= limit) { // 다음 페이지 이동
				BookContents content = BookContents.builder()
												   .content(curContent)
												   .pageNo(String.valueOf(pageNo++))
												   .bookIsbn(isbn)
												   .build();
				
				BookContentsRepository.save(content);
				size = 0;
				curContent = "";
			}
			curContent += temp + ".";
			if(!st.hasMoreElements()) {
				BookContents content = BookContents.builder()
												   .content(curContent)
												   .pageNo(String.valueOf(pageNo++))
												   .bookIsbn(isbn)
												   .build();
				
				BookContentsRepository.save(content);
			}

		}

//		int contentSize = desc.length();
//		int start = 0;
//
//		while(true) {
//			int end = start + limit;
//			if(end > contentSize) end = contentSize;
//
//			String curContent1 = desc.substring(start, end);
//			BookContents content = BookContents.builder()
//					.content(curContent1)
//					.pageNo(String.valueOf(pageNo++))
//					.bookIsbn(isbn)
//					.build();
//
//			BookContentsRepository.save(content);
//			start = end;
//			if(start >= contentSize) break;
//		}

		return book;
	}

	// 전체 도서 조회
	@Override
	public Page<Book> findAll(Pageable pageable) {
//		Page<Book> books = bookRepository.findAll();
//		List<Book> books = new ArrayList<Book>();
//		bookRepository.findAll(pageable).forEach(e -> books.add(e));

		return bookRepository.findAll(pageable);
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
