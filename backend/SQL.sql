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