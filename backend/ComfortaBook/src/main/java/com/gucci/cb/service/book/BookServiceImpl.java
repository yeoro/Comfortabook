package com.gucci.cb.service.book;

import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gucci.cb.domain.book.BestSeller;
import com.gucci.cb.domain.book.Book;
import com.gucci.cb.domain.book.BookContents;
import com.gucci.cb.domain.user.UserBooks;
import com.gucci.cb.dto.book.BookDTO;
import com.gucci.cb.repository.book.BookContentsRepository;
import com.gucci.cb.repository.book.BookRepository;
import com.gucci.cb.repository.user.UserBookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

	private final BookRepository bookRepository; 
	private final UserBookRepository userBookRepository;
	private final BookContentsRepository bookContentsRepository;

	// 도서 정보 등록
	@Override
	public Book insert(Book book) {
		bookRepository.save(book);

		String desc = book.getDescription();
		Long bookNo = book.getBookNo();

		String curContent = "";
		StringTokenizer st = new StringTokenizer(desc, ".");

		int pageNo = 1;
		int limit = 500;
		int size = 0;

		while(st.hasMoreElements()) {
			String temp = st.nextToken() + ".";
			size = curContent.length() + temp.length();

			if(size >= limit) {
				System.out.println("page : " + pageNo + ", size : " + curContent.length());
				BookContents content = BookContents.builder()
						.content(curContent)
						.pageNo(String.valueOf(pageNo++))
						.bookNo(bookNo)
						.build();

				bookContentsRepository.save(content);

				curContent = temp;
			} else {
				curContent = curContent + temp;
			}
		}

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
	public void delete(Long bookNo) {

		List<BookContents> bookContents = bookContentsRepository.findAllByBookNo(bookNo);

		bookContentsRepository.deleteAll(bookContents);
		bookRepository.deleteById(bookNo);
	}

	// 내 도서 등록
	@Override
	public UserBooks insertByNo(UserBooks userBooks) {
		
		Optional<UserBooks> userBook = userBookRepository.findByUserNoAndBookNo(userBooks.getUserNo(), userBooks.getBookNo());
		
		// 존재한다면
		if(userBook.isPresent()) {
			UserBooks exist = new UserBooks();
			return exist;
		}
		
		userBookRepository.save(userBooks);
		return userBooks;
	}

	// 내 도서 삭제
	@Override
	public void deleteByNo(Long userNo, Long bookNo) {

		List<UserBooks> userBook = userBookRepository.findAllByUserNoAndBookNo(userNo, bookNo);

		userBookRepository.deleteAll(userBook);
	}

	// 알라딘 베스트 셀러
	@Override
	public List<BestSeller> findBSAll() {
		
		try {
			String url = AladdinOpenAPI.GetUrl();
			
			AladdinOpenAPIHandler api = new AladdinOpenAPIHandler();
			
			api.parseXml(url);
			System.out.println(url);
			for(Item item : api.Items){
				System.out.println("제목 : " + item.title + 
								   "\n저자 : " + item.author +
								   "\n출판사 : " + item.publisher +
								   "\n설명 : " + item.description + 
								   "\n이미지 : " + item.cover);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
}
