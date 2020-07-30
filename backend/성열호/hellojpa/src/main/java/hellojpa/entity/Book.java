package hellojpa.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
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
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "member_no")
	private Member member;
	
}
