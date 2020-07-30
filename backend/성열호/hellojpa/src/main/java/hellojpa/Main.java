package hellojpa;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import hellojpa.entity.Book;
import hellojpa.entity.Member;
import hellojpa.entity.MemberType;

public class Main {

	public static void main(String[] args) {
		
		// persistence.xml의 unit name이 hello인 설정을 가지고 온다.
		// emf : 하나만 생성해서 앱 전체에서 공유해야 함
		// 유저가 사용시 꺼내서 사용함
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
		
		// em : 쓰레드간에 공유하면 안됨
		EntityManager em = emf.createEntityManager();
		
		// JPA의 모든 활동은 transaction 안에서 이루어진다.
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		
		// 보통 비즈니스 로직은 try/catch 안에서 실행된다.
		try {
			
			Member member = new Member();
			member.setId("kwonsky");
			member.setPassword("kwonsky");
			member.setName("kwonsky");
			member.setEmail("kwonsky@ssafy.com");
			member.setMemberType(MemberType.member);
			em.persist(member);
			
			Book book = new Book();
			book.setIsbn("3");
			book.setTitle("JPA");
			book.setAuthor("kim");
			book.setPublisher("ssafy");
			book.setPublishDate(new Date());
			book.setCategory("programming");
			book.setMember(member);
			em.persist(book);
			
			System.out.println("member_no : " + member.getMemberNo());
			
			em.flush(); // DB에 쿼리 전부 보냄
			em.clear(); // 캐시 초기화
			
			Book findBook = em.find(Book.class, book.getBookNo());
			Member findMember = findBook.getMember();
			
			System.out.println(findMember.getName());
			
			
			
			tx.commit();
		} catch (Exception e) {
			// 문제가 생길 경우 transaction을 롤백시킴
			tx.rollback();
		} finally {
			// em을 닫아주지 않으면 데이터에 문제가 생김
			em.close();
		}
		
		emf.close();
	}

}
