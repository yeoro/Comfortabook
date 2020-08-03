package hellojpa;

import java.util.Date;
import java.util.List;

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
			
			Member member = em.find(Member.class, 1);
			em.persist(member); // persist()로 영속상태로 저장한다.
//			member.setId("kwonsky");
//			member.setPassword("kwonsky");
//			member.setName("kwonsky");
//			member.setEmail("kwonsky@ssafy.com");
//			member.setMemberType(MemberType.member);
			
			Book book1 = em.find(Book.class, 1);
			book1.setMember(member);
			em.persist(book1);
			System.out.println(book1.getTitle());

			Book book2 = em.find(Book.class, 2);
			book2.setMember(member);
			em.persist(book2);
			System.out.println(book2.getTitle());
			
//			Member member3 = em.find(Member.class, 19);
//			em.remove(member3);
//			book.setIsbn("3");
//			book.setTitle("JPA");
//			book.setAuthor("kim");
//			book.setPublisher("ssafy");
//			book.setPublishDate(new Date());
//			book.setCategory("programming");
//			book.setMember(member);
			
//			em.flush(); // DB에 쿼리 전부 보냄
//			em.clear(); // 영속성 컨텍스트의 캐시를 초기화함
			
			System.out.println("member no : " + book1.getMember().getMemberNo());
			System.out.println("member name : " + book2.getMember().getName());
			System.out.println("book list : ");
			List<Book> books = member.getBooks();
			for(Book b : books) {
				System.out.println(b.getTitle());
			}
			
//			String jpql = "select b From Book b where b.title like '%jpa%'";
			String jpql = "select b From Book b join fetch b.member";
			List<Book> result = em.createQuery(jpql, Book.class).getResultList();
			for(Book b : result) {
				System.out.println("Book = " + b.getTitle() + ", Member = " + b.getMember().getName());
			}
			
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
