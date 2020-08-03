package hellojpa.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
@ToString(exclude = "member")
public class Book {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_no")
	private int bookNo;
	
	private String isbn;
	
	private String title;
	
	private String author;
	
	private String publisher;
	
	@Column(name = "publish_date")
	@Temporal(TemporalType.DATE)
	private Date publishDate;
	
	private String category;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no") // 양방향 연관관계의 주인만이 JoinCloumn, 외래키가 있는 곳을 주인으로
	private Member member;
	
}
