package com.gucci.cb.domain.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {

	@Id // pk
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_no")
	private Long userNo;
	
//	@Column(nullable = false, unique = true, length = 50)
	private String email;
	
//	@Column(length = 100)
	private String password;
	
//	@Column(nullable = false, length = 100)
	private String name;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
//	@Column(length = 100)
	private String provider;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_no", foreignKey = @ForeignKey(name = "FK_user"))
	private Set<UserBooks> userBooks;
	
	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<>();
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}
	
	public void updatePassword(String password) {
		this.password = password;
	}
	
	public void update(String name, String password, String phoneNumber) {
		this.name = name;
		this.password = password;
		this.phoneNumber = phoneNumber;
	}
	
	@Override
	public String getUsername() { // 회원 id
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() { // 계정이 만료가 안되었는지
		return true;
	}

	@Override
	public boolean isAccountNonLocked() { // 계정이 잠기지 않았는지
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() { // 계정 패스워드가 만료 안되었는지
		return true;
	}

	@Override
	public boolean isEnabled() { // 계정이 사용 가능한지
		return true;
	}
}

