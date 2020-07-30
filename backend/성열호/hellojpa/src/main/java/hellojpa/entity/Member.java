package hellojpa.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
public class Member {
	
	/*
	 * Id : 직접 매핑
	 * generation Type
	 * 	- identity : DB에게 위임
	 *  - squence
	 *  - table
	 *  - auto
	 * 
	 * PK는 변할 수 있는 데이터 대신 대체키를 사용하자 ex) Long type + auto increment
	 */
	@Id // PK 매핑
	@Column(name = "member_no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int memberNo;
	
	@Column(name = "id") // entity와 매핑된 테이블에 있는 컬럼명 입력
	private String id;
	
	private String password;
	
	private String name;
	
	private String email;
	
//	@Temporal(TemporalType.TIMESTAMP) // 날짜
//	private Date regDate;
	
	@Column(name = "member_type")
	@Enumerated(EnumType.STRING)
	private MemberType memberType;
}
