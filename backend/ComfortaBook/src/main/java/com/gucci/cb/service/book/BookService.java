package com.gucci.cb.service.book;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gucci.cb.domain.book.BestSeller;
import com.gucci.cb.domain.book.Book;
import com.gucci.cb.domain.user.User;
import com.gucci.cb.domain.user.UserBooks;
import com.gucci.cb.dto.book.BookDTO;

public interface BookService {

	// 도서 정보 등록
	Book insert(Book book);

	// 전체 도서 조회
	//	List<Book> findAll();
	Page<Book> findAll(String type, String keyword, Pageable pageable);
	

	// 도서 상세 조회
	Book findByNo(Long bookNo);

	// 도서 정보 수정
	void updateByNo(Long bookNo, BookDTO bookDto);

	// 도서 삭제
	void delete(Long bookNo);

	// 내 도서 등록
	UserBooks insertByNo (UserBooks userBooks);

	// 내 도서 삭제
	void deleteByNo(Long UserNo, Long BookNo);
	
	// 알라딘 베스트 셀러
	List<BestSeller> findBSAll();
	
	// 책갈피 기능
	void updateBookMark(UserBooks userBooks);
	
	// 최근 본 책 저장
	void updateRecentBook(UserBooks userBooks);
}
