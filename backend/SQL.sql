-- create user table
CREATE TABLE gucci.`user` (
	`no` INT auto_increment NOT NULL,
	id varchar(20) NOT NULL,
	password varchar(20) NOT NULL,
	name varchar(10) NOT NULL,
	email varchar(50) NOT NULL,
	phone_number varchar(20) NULL,
	is_manager BOOL NULL,
	CONSTRAINT user_pk PRIMARY KEY (`no`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

insert into user(id, password, name , email , phone_number , is_manager ) 
	values ('admin','admin','관리자','admin@naver.com','010-1234-5678', true);
	
insert into user(id, password, name , email , phone_number , is_manager ) 
	values ('test','test','테스트','test@naver.com','010-1234-5678', false);

-- create book table
CREATE TABLE gucci.book (
   isbn varchar(30) NOT NULL,
   title varchar(100) NOT NULL,
   author varchar(20) NOT NULL,
   publisher varchar(20) NOT NULL,
   publish_date DATETIME NOT NULL,
   category varchar(10) NOT NULL,
   price INT NULL,
   description varchar(100) NULL,
   image varchar(30) null,
   user_no INT,
   CONSTRAINT user_fk FOREIGN KEY (user_no) REFERENCES user(no),
   CONSTRAINT book_pk PRIMARY KEY (isbn)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

insert into book( isbn, title, author, publisher, publish_date, category ) 
		  values( '1', 'test1', 'test1', 'test1', '2020-01-01', 'test1' );
insert into book( isbn, title, author, publisher, publish_date, category ) 
		  values( '2', 'test2', 'test2', 'test2', '2020-02-02', 'test2' );